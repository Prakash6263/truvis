import { useState, useEffect, useRef } from "react"
import { sendAuditChat } from "../api/audit"
import ChatInput from "./ChatInput"
import Swal from "sweetalert2"

const AuditChat = ({ auditId, initialChatHistory = [] }) => {
  const [messages, setMessages] = useState(initialChatHistory || [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message, file) => {
    if (!message.trim() || !auditId) return

    // Add user message to chat immediately for better UX
    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setError(null)

    try {
      setLoading(true)
      const response = await sendAuditChat(auditId, message)

      console.log("[v0] Chat response:", response)

      // Add assistant response
      if (response.assistant_message) {
        const assistantMessage = {
          role: "assistant",
          content: response.assistant_message,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (err) {
      console.error("[v0] Error sending message:", err)
      setError("Failed to send message. Please try again.")

      // Remove the user message if request failed
      setMessages((prev) => prev.slice(0, -1))

      Swal.fire({
        title: "Error",
        text: "Failed to send message. Please try again.",
        icon: "error",
        timer: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatMessage = (content) => {
    // Basic markdown support for better readability
    return content
      .split("\n")
      .map((line, idx) => (
        <div key={idx} style={{ marginBottom: "8px" }}>
          {line}
        </div>
      ))
  }

  return (
    <div className="audit-chat" style={{ display: "flex", flexDirection: "column", height: "100%", gap: "15px" }}>
      {/* Chat History */}
      <div
        className="chat-history"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#999",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>💬</div>
              <p>Start a conversation about this audit</p>
              <p style={{ fontSize: "12px", marginTop: "10px" }}>Ask questions about findings, risks, or recommendations</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: msg.role === "user" ? "#3AC6BD" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#000",
                  border: msg.role === "user" ? "none" : "1px solid #eee",
                  wordWrap: "break-word",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {formatMessage(msg.content)}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                border: "1px solid #eee",
              }}
            >
              <span style={{ animation: "blink 1.4s infinite" }}>●●●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee",
            color: "#c33",
            borderRadius: "6px",
            fontSize: "13px",
            border: "1px solid #fcc",
          }}
        >
          {error}
        </div>
      )}

      {/* Chat Input */}
      <div style={{ padding: "10px 0" }}>
        <ChatInput onSendMessage={handleSendMessage} disabled={loading || !auditId} />
      </div>

      <style>{`
        @keyframes blink {
          0%, 20%, 50%, 80%, 100% { opacity: 1; }
          40% { opacity: 0.5; }
          60% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default AuditChat
