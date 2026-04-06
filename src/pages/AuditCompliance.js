"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuditHistorySidebar from "../components/AuditHistorySidebar"
import TopBar from "../components/TopBar"

const AuditCompliance = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle("dark-mode")
    document.getElementById("sidebar").classList.toggle("dark-mode")
  }

  const handleStartAudit = () => {
    navigate("/audit-compliance-step1")
  }

  return (
    <div className={`audit-compliance-page ${isDarkMode ? "dark-mode" : ""}`}>
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
        <AuditHistorySidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />

        <div className="main2">
          <TopBar onSidebarToggle={handleSidebarToggle} onModeToggle={handleModeToggle} />

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
              <div className="col-md-6">
                <div className="card-box" onClick={handleStartAudit} style={{ cursor: "pointer" }}>
                  <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="chat" />
                  Start Comprehensive Audit Assessment
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-box">
                  <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="chat" />
                  Is this policy compliant with ISO 27001?
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-box">
                  <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="chat" />
                  Check for ethical bias
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-box">
                  <img src="assets/img/chaticon.png" style={{ width: "24px", marginRight: "10px" }} alt="chat" />
                  Quick Compliance Check
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuditCompliance
