"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Preloader from "../components/Preloader"
import ChatInput from "../components/ChatInput"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"

const Chat = () => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [isDarkMode])



  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }


  const handleSendMessage = (message) => {
    console.log("Sending message:", message)
    // Handle message sending logic here
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
        {/* Sidebar */}
<Sidebar/>

        {/* Main Area */}
        <div className="main2">
      <TopBar/>

          <div className="middle">
            <div className="text-center mt-5 mb-5">
              <select className="myselect">
                <option>AI Modal 0.1</option>
              </select>
            </div>

            <div className="row g-3">
              <div className="col-lg-12 mb-2">
                <div className="greeting">
                  Good Day ! How can I assist you <span>today?</span>
                </div>
              </div>
              <div className="col-md-4">
                <a href="/risk-management-chat">
                  <div className="card-box">
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Risk Management & Cybersecurity
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/audit-compliance-step1">
                  <div className="card-box">
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    Audit and Compliance check
                  </div>
                </a>
              </div>
              <div className="col-md-4">
                <a href="/ai-governance-compliance-step1">
                  <div className="card-box">
                    <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="" />
                    AI Governance Compliance Check
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
<ChatInput onSendMessage={handleSendMessage}/>
        {/* <div className="chat-input">
          <form onSubmit={handleSendMessage} className="d-flex align-items-center">
            <input
              type="text"
              placeholder="Type to ask our ai.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <i className="fas fa-paperclip"></i>
            <button type="submit">
              <i className="fa fa-paper-plane text-white"></i>
            </button>
          </form>
        </div> */}
      </main>
    </div>
  )
}

export default Chat
