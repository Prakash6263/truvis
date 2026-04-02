import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Preloader from "../components/Preloader"
import ChatInput from "../components/ChatInput"
import Sidebar from "../components/Sidebar"
import MarkdownRenderer from "../components/MarkdownRenderer"
import FileViewerModal from "../components/FileViewerModal"
import { streamMessage, uploadMessageStream, getChat, createChat } from "../api/chat"
import TopBar from "../components/TopBar"

const RiskManagementChat = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [message, setMessage] = useState("")
  const [currentChatId, setCurrentChatId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isInChat, setIsInChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isFileModalOpen, setIsFileModalOpen] = useState(false)
  const roleModule = "risk" // This component always uses "risk" roleModule

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [isDarkMode])

  useEffect(() => {
    const loadSavedChat = async () => {
      const savedChatId = localStorage.getItem("currentChatId")
      if (savedChatId) {
        setCurrentChatId(savedChatId)
        setIsInChat(true)
        setIsLoading(true)

        try {
          const response = await getChat(savedChatId)
          const chatData = response.chat || response
          const formattedMessages = chatData.messages.map((msg) => ({
            text: msg.content,
            sender: msg.role === "user" ? "user" : "assistant",
            timestamp: new Date(msg.createdAt),
            file: msg.filePath
              ? {
                  name: msg.originalName || "Uploaded file",
                  type: msg.fileType,
                  path: msg.filePath,
                }
              : null,
          }))

          const deduplicatedMessages = []
          const seen = new Set()

          for (const msg of formattedMessages) {
            const key = `${msg.sender}-${msg.text}-${msg.timestamp.getTime()}`
            if (!seen.has(key)) {
              seen.add(key)
              deduplicatedMessages.push(msg)
            }
          }

          console.log("[v0] Loaded messages:", formattedMessages.length, "Deduplicated:", deduplicatedMessages.length)
          setMessages(deduplicatedMessages)
        } catch (error) {
          console.error("Failed to load saved chat:", error)
          // If chat doesn't exist anymore, clear the saved state
          localStorage.removeItem("currentChatId")
          setCurrentChatId(null)
          setIsInChat(false)
          setMessages([])
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadSavedChat()
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleLogout = () => {
    navigate("/login")
  }

  const handleSendMessage = async (messageText, file = null) => {
    // If no current chat, create one first
  let targetChatId = currentChatId;
  
  if (!targetChatId) {
    try {
      const newChatId = await handleCreateNewChat();
      if (!newChatId) {
        console.error("Failed to create new chat");
        return;
      }
      targetChatId = newChatId;
    } catch (error) {
      console.error("Error creating new chat:", error);
      return;
    }
  }

  // Rest of your existing handleSendMessage code
  if ((!messageText.trim() && !file) || isLoading) return;

  console.log("[v0] handleSendMessage called with:", { messageText, file: file?.name, isLoading });

  if (isLoading) {
    console.log("[v0] Already loading, ignoring duplicate call");
    return;
  }

  setIsLoading(true);
  setStreamingMessage("");

    const userMessage = {
      text: messageText,
      sender: "user",
      timestamp: new Date(),
      file: file ? { name: file.name, type: file.type } : null,
    }

    console.log("[v0] Adding user message:", userMessage)

    // Add user message immediately to UI
    setMessages((prev) => [...prev, userMessage])

    // Add placeholder for AI response
    const aiMessageIndex = messages.length + 1 // Current messages + user message = AI index

    setMessages((prev) => [
      ...prev,
      {
        text: "",
        sender: "assistant",
        timestamp: new Date(),
        isStreaming: true,
      },
    ])

    const loadingTimeout = setTimeout(() => {
      console.log("[v0] Streaming timeout - resetting loading state")
      setIsLoading(false)
      setStreamingMessage("")
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === aiMessageIndex && msg.isStreaming
            ? { ...msg, text: msg.text || "Request timed out. Please try again.", isStreaming: false }
            : msg,
        ),
      )
    }, 30000)

    const onToken = (token) => {
      setStreamingMessage((prev) => prev + token)
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === aiMessageIndex
            ? { ...msg, text: (prev.find((m, i) => i === aiMessageIndex)?.text || "") + token }
            : msg,
        ),
      )
    }

    const onDone = (fullResponse) => {
      console.log("[v0] Stream completed with response length:", fullResponse?.length)
      clearTimeout(loadingTimeout)
      setMessages((prev) =>
        prev.map((msg, index) => (index === aiMessageIndex ? { ...msg, text: fullResponse, isStreaming: false } : msg)),
      )
      setIsLoading(false)
      setStreamingMessage("")
    }

    const onTitleUpdate = (chatId, newTitle) => {
      console.log("[v0] Title updated:", { chatId, newTitle })
      setSidebarRefreshTrigger((prev) => prev + 1)
    }

    const onError = (error) => {
      console.log("[v0] Stream error:", error)
      clearTimeout(loadingTimeout)
      console.error("Streaming error:", error)
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === aiMessageIndex
            ? { ...msg, text: "Sorry, there was an error processing your message.", isStreaming: false }
            : msg,
        ),
      )
      setIsLoading(false)
      setStreamingMessage("")
    }

   try {
    if (file) {
      console.log("[v0] Starting file upload stream")
      uploadMessageStream(targetChatId, messageText, file, onToken, onDone, onError, onTitleUpdate)
    } else {
      console.log("[v0] Starting text message stream")
      streamMessage(targetChatId, messageText, onToken, onDone, onError, onTitleUpdate)
    }
    } catch (error) {
      console.log("[v0] Stream initiation error:", error)
      clearTimeout(loadingTimeout)
      onError(error)
    }
  }

  const handleNewChat = (chatId) => {
    setCurrentChatId(chatId)
    setMessages([])
    setIsInChat(true)
    localStorage.setItem("currentChatId", chatId)
  }

  const handleCreateNewChat = async () => {
    try {
      const newChat = await createChat({
        title: "Risk Assessment Chat",
        roleModule: roleModule, // Uses component-specific roleModule
        firstMessage: "I need help with risk management assessment",
      })

      // Update local state
      setCurrentChatId(newChat.chat._id)
      setMessages([])
      setIsInChat(true)
      localStorage.setItem("currentChatId", newChat.chat._id)

      // Trigger sidebar refresh to show new chat
      setSidebarRefreshTrigger((prev) => prev + 1)

      return newChat.chat._id
    } catch (error) {
      console.error("Failed to create new chat:", error)
      return null
    }
  }

  const handleStartAssessment = async () => {
    navigate("/risk-management")
  }

  const handleChatSelect = async (chatId) => {
    setCurrentChatId(chatId)
    setIsInChat(true)
    setIsLoading(true)
    localStorage.setItem("currentChatId", chatId)

    try {
      const response = await getChat(chatId)
      const chatData = response.chat || response
      const formattedMessages = chatData.messages.map((msg) => ({
        text: msg.content,
        sender: msg.role === "user" ? "user" : "assistant",
        timestamp: new Date(msg.createdAt),
        file: msg.filePath
          ? {
              name: msg.originalName || "Uploaded file",
              type: msg.fileType,
              path: msg.filePath,
            }
          : null,
      }))

      const deduplicatedMessages = []
      const seen = new Set()

      for (const msg of formattedMessages) {
        const key = `${msg.sender}-${msg.text}-${msg.timestamp.getTime()}`
        if (!seen.has(key)) {
          seen.add(key)
          deduplicatedMessages.push(msg)
        }
      }

      console.log(
        "[v0] Chat selected - messages:",
        formattedMessages.length,
        "Deduplicated:",
        deduplicatedMessages.length,
      )
      setMessages(deduplicatedMessages)
    } catch (error) {
      console.error("Failed to load chat:", error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePredefinedMessage = (messageText) => {
    if (!currentChatId) return
    handleSendMessage(messageText)
  }

  const handleFileClick = (file) => {
    setSelectedFile(file)
    setIsFileModalOpen(true)
  }

  const closeFileModal = () => {
    setIsFileModalOpen(false)
    setSelectedFile(null)
  }

  return (
    <div>
      <Preloader />

      <style>
        {`
          :root {
            --bg-light: #ffffff;
            --bg-dark: #121212;
            --text-light: #000;
            --text-dark: #fff;
            --accent: #3AC6BD;
            --sidebar-width: 300px;
            --card-bg: #f9f9f9;
            --border-color: #eee;
          }

          body {
            font-family: 'Segoe UI', sans-serif;
            margin: 0;
            background-color: var(--bg-light);
            color: var(--text-light);
            transition: all 0.3s ease;
          }
        `}
      </style>

      <main className="main">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={toggleSidebar}
          onNewChat={handleNewChat}
          onChatSelect={handleChatSelect}
          activeChatId={currentChatId}
          refreshTrigger={sidebarRefreshTrigger}
          roleModule={roleModule}
        />

        {/* Main Area */}
        <div className="main2">
<TopBar onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} onLogout={handleLogout} />

          <div className="middle">
            {/* <div className="text-center">
              <select className="myselect">
                <option>AI Modal 0.1</option>
              </select>
            </div> */}

            {messages.length === 0 && !isLoading ? (
              // Show welcome interface when no messages exist
              <div className="row g-3">
                <div className="col-lg-12 mb-2">
                  <div className="greeting">
                    Good Day ! How can I assist you <span>today?</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-box" onClick={handleStartAssessment} style={{ cursor: "pointer" }}>
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Start Risk Management Assessment
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="card-box"
                    onClick={async () => {
                      const chatId = await handleCreateNewChat()
                      if (chatId) {
                        handleSendMessage(
                          "I need to begin a comprehensive security audit. What are the key areas I should focus on?",
                        )
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Begin Security Audit
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="card-box"
                    onClick={async () => {
                      if (!currentChatId) {
                        const chatId = await handleCreateNewChat()
                        if (chatId) {
                          handleSendMessage("Is this policy compliant with ISO 27001?")
                        }
                      } else {
                        handlePredefinedMessage("Is this policy compliant with ISO 27001?")
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Is this policy compliant with ISO 27001?
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="card-box"
                    onClick={async () => {
                      if (!currentChatId) {
                        const chatId = await handleCreateNewChat()
                        if (chatId) {
                          handleSendMessage("Check for ethical bias")
                        }
                      } else {
                        handlePredefinedMessage("Check for ethical bias")
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Check for ethical bias
                  </div>
                </div>
              </div>
            ) : (
              // Show chat interface when messages exist
              <div className="chat-container">
                <div
                  className="messages-container"
                  style={{
                    height: "400px",
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      <div
                        className={`message ${msg.sender}`}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "12px",
                          backgroundColor: msg.sender === "user" ? "#3AC6BD" : "#f1f1f1",
                          color: msg.sender === "user" ? "white" : "black",
                          maxWidth: "70%",
                          wordWrap: "break-word",
                        }}
                      >
                        {msg.file && (
                          <div
                            style={{
                              marginBottom: "8px",
                              fontSize: "12px",
                              opacity: 0.8,
                              cursor: "pointer",
                              padding: "4px 8px",
                              backgroundColor: "rgba(255,255,255,0.1)",
                              borderRadius: "4px",
                              display: "inline-block",
                            }}
                            onClick={() => handleFileClick(msg.file)}
                            title="Click to view file"
                          >
                            📎 {msg.file.name}
                          </div>
                        )}
                        <div>
                          {msg.sender === "assistant" ? <MarkdownRenderer content={msg.text} /> : msg.text}
                          {msg.isStreaming && <span style={{ animation: "blink 1s infinite" }}>▋</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        <FileViewerModal file={selectedFile} isOpen={isFileModalOpen} onClose={closeFileModal} />
      </main>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default RiskManagementChat



