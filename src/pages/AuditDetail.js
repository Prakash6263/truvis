"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AuditHistorySidebar from "../components/AuditHistorySidebar"
import TopBar from "../components/TopBar"
import ChatInput from "../components/ChatInput"
import { getAuditDetail, sendAuditChat } from "../api/audit"
import Swal from "sweetalert2"

const AuditDetail = () => {
  const navigate = useNavigate()
  const { auditId } = useParams()
  const [auditData, setAuditData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [chatLoading, setChatLoading] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const fetchAuditDetail = async () => {
      try {
        setLoading(true)
        console.log("[v0] Fetching audit detail for ID:", auditId)
        const data = await getAuditDetail(auditId)
        console.log("[v0] Audit detail received:", data)
        setAuditData(data)
        
        // Load existing chat history if available
        if (data.chat_history && Array.isArray(data.chat_history)) {
          setChatMessages(data.chat_history)
        }
        setError("")
      } catch (err) {
        console.error("[v0] Error fetching audit detail:", err)
        setError("Failed to load audit details. Please try again.")
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load audit details",
          confirmButtonColor: "#dc3545",
        })
      } finally {
        setLoading(false)
      }
    }

    if (auditId) {
      fetchAuditDetail()
    }
  }, [auditId])

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle("dark-mode")
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.classList.toggle("dark-mode")
    }
  }

  const handleSendMessage = async (message) => {
    if (!message.trim() || !auditData?.audit_id) {
      return
    }

    try {
      setChatLoading(true)

      // Add user message to chat
      const userMsg = { role: "user", content: message }
      setChatMessages((prev) => [...prev, userMsg])

      // Send message to API
      const response = await sendAuditChat(auditData.audit_id, message)
      console.log("[v0] Chat response:", response)

      // Add assistant response to chat
      const assistantMsg = {
        role: "assistant",
        content: response.assistant_reply,
      }
      setChatMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      console.error("[v0] Chat error:", err)
      Swal.fire({
        icon: "error",
        title: "Chat Error",
        text: err.response?.data?.message || "Failed to send message. Please try again.",
        confirmButtonColor: "#dc3545",
      })
    } finally {
      setChatLoading(false)
    }
  }

  const handleBackToAudit = () => {
    navigate("/audit-compliance")
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case "critical":
        return "#dc3545"
      case "high":
        return "#ff9800"
      case "medium":
        return "#ffc107"
      case "low":
        return "#4caf50"
      default:
        return "#6c757d"
    }
  }

  if (loading) {
    return (
      <>
        <style>{`
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

          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 18px;
            color: var(--accent);
          }
        `}</style>
        <main className="main">
          <AuditHistorySidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
          <div className="main2">
            <TopBar onSidebarToggle={handleSidebarToggle} onModeToggle={handleModeToggle} />
            <div className="loading-container">
              <p>Loading audit details...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error || !auditData) {
    return (
      <>
        <style>{`
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

          .error-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
            gap: 20px;
          }

          .error-container button {
            padding: 10px 20px;
            background-color: var(--accent);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
        `}</style>
        <main className="main">
          <AuditHistorySidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
          <div className="main2">
            <TopBar onSidebarToggle={handleSidebarToggle} onModeToggle={handleModeToggle} />
            <div className="error-container">
              <p style={{ color: "#dc3545", fontSize: "16px" }}>{error || "Audit not found"}</p>
              <button onClick={handleBackToAudit}>Back to Audits</button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <style>{`
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

          .audit-detail-header {
            background-color: var(--card-bg);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid var(--border-color);
          }

          .audit-detail-header h2 {
            margin: 0 0 10px 0;
            color: var(--accent);
            font-size: 24px;
          }

          .audit-info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
          }

          .audit-info-item {
            background-color: white;
            padding: 12px;
            border-radius: 4px;
            border-left: 4px solid var(--accent);
          }

          .audit-info-item label {
            font-weight: 600;
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            display: block;
            margin-bottom: 5px;
          }

          .audit-info-item value {
            color: var(--text-light);
            font-size: 14px;
          }

          .findings-section {
            margin-top: 30px;
          }

          .findings-section h3 {
            color: var(--accent);
            margin-bottom: 20px;
            font-size: 18px;
          }

          .finding-card {
            background-color: var(--card-bg);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid;
            border-left-color: var(--risk-color, #666);
          }

          .finding-card h4 {
            margin: 0 0 10px 0;
            font-size: 16px;
            color: var(--text-light);
          }

          .finding-card p {
            margin: 8px 0;
            font-size: 13px;
            line-height: 1.5;
            color: #555;
          }

          .risk-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            color: white;
            margin-top: 10px;
          }

          .overview-section {
            background-color: var(--card-bg);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid var(--accent);
            line-height: 1.6;
            color: #555;
          }

          .chat-section {
            margin-top: 30px;
            background-color: var(--card-bg);
            padding: 15px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
          }

          .chat-section h3 {
            color: var(--accent);
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 18px;
          }

          .chat-messages {
            background-color: white;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 15px;
            max-height: 400px;
            overflow-y: auto;
            min-height: 200px;
          }

          .chat-message {
            margin-bottom: 12px;
            padding: 10px;
            border-radius: 4px;
            word-wrap: break-word;
          }

          .chat-message.user {
            background-color: #e3f2fd;
            text-align: right;
            margin-left: 20px;
          }

          .chat-message.assistant {
            background-color: #f5f5f5;
            margin-right: 20px;
          }

          .chat-message.assistant strong {
            color: var(--accent);
          }

          .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
          }

          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
          }

          .btn-primary {
            background-color: var(--accent);
            color: white;
          }

          .btn-primary:hover {
            opacity: 0.9;
          }

          .btn-secondary {
            background-color: #e0e0e0;
            color: #333;
          }

          .btn-secondary:hover {
            background-color: #d0d0d0;
          }

          .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            background-color: #c8e6c9;
            color: #2e7d32;
          }

          .main {
            display: flex;
            width: 100%;
            min-height: 100vh;
            background-color: var(--bg-light);
          }

          .main2 {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-y: auto;
          }

          .middle {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
          }

          .audit-detail-header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
          }

          .audit-detail-header h2 {
            color: var(--accent);
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 600;
          }

          .audit-info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 20px;
          }

          .audit-info-item {
            padding: 15px;
            border-left: 4px solid var(--accent);
            background-color: var(--card-bg);
            border-radius: 4px;
          }

          .audit-info-item label {
            font-size: 12px;
            color: #999;
            text-transform: uppercase;
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
          }

          .audit-info-item div {
            font-size: 14px;
            color: var(--text-light);
            font-weight: 500;
          }

          .overview-section {
            background-color: var(--card-bg);
            padding: 20px;
            border-left: 4px solid var(--accent);
            border-radius: 4px;
            margin-bottom: 30px;
          }

          .overview-section p {
            margin: 0;
            color: #666;
            line-height: 1.6;
          }

          .findings-section {
            margin-bottom: 30px;
          }

          .findings-section h3 {
            color: var(--accent);
            margin-bottom: 20px;
          }

          .finding-card {
            background-color: var(--card-bg);
            padding: 20px;
            border-left: 4px solid #ff6b6b;
            border-radius: 4px;
            margin-bottom: 15px;
          }

          .finding-card h4 {
            margin: 0 0 15px 0;
            color: var(--text-light);
            font-size: 16px;
          }

          .finding-card p {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 14px;
            line-height: 1.5;
          }

          .risk-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            color: white;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            margin-top: 10px;
          }

          .chat-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
          }

          .chat-section h3 {
            color: var(--accent);
            margin-bottom: 20px;
          }

          .chat-messages {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 20px;
            min-height: 300px;
            max-height: 500px;
            overflow-y: auto;
            margin-bottom: 15px;
          }

          .chat-message {
            margin-bottom: 15px;
            padding: 12px;
            border-radius: 4px;
          }

          .chat-message.user {
            background-color: #e3f2fd;
            text-align: right;
          }

          .chat-message.assistant {
            background-color: #f5f5f5;
          }

          .chat-message strong {
            color: var(--text-light);
          }

          @media (max-width: 1200px) {
            .audit-info-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 768px) {
            .audit-info-grid {
              grid-template-columns: 1fr;
            }

            .audit-detail-header h2 {
              font-size: 20px;
            }
          }
        `}
      </style>

      <main className="main">
        <AuditHistorySidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />

        <div className="main2">
          <TopBar onSidebarToggle={handleSidebarToggle} onModeToggle={handleModeToggle} />

          <div className="middle" style={{ padding: "20px" }}>
            {/* Audit Header */}
            <div className="audit-detail-header">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2>{auditData.scope?.audit_type || "Audit Detail"}</h2>
                  <span className="status-badge">{auditData.processing_status || "pending"}</span>
                </div>
                <button className="btn btn-secondary" onClick={handleBackToAudit}>
                  ← Back to Audits
                </button>
              </div>

              <div className="audit-info-grid">
                <div className="audit-info-item">
                  <label>Department</label>
                  <div>{auditData.scope?.department || "N/A"}</div>
                </div>
                <div className="audit-info-item">
                  <label>Standards</label>
                  <div>{auditData.scope?.standards ? auditData.scope.standards.join(", ") : "N/A"}</div>
                </div>
                <div className="audit-info-item">
                  <label>Date Range</label>
                  <div>
                    {auditData.scope?.date_range
                      ? `${auditData.scope.date_range[0]} to ${auditData.scope.date_range[1]}`
                      : "N/A"}
                  </div>
                </div>
                <div className="audit-info-item">
                  <label>Audit ID</label>
                  <div style={{ fontSize: "11px", fontFamily: "monospace", wordBreak: "break-all" }}>
                    {auditData.audit_id}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            {auditData.overview && (
              <div className="overview-section">
                <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Audit Overview</h3>
                <p>{auditData.overview}</p>
              </div>
            )}

            {/* Findings Section */}
            {auditData.findings && auditData.findings.length > 0 && (
              <div className="findings-section">
                <h3>Key Findings ({auditData.findings.length})</h3>
                {auditData.findings.map((finding, index) => (
                  <div
                    key={index}
                    className="finding-card"
                    style={{ borderLeftColor: getRiskColor(finding.currentRiskLevel) }}
                  >
                    <h4>#{finding.riskId} - {finding.riskStatement}</h4>
                    <p>
                      <strong>Justification:</strong> {finding.justification}
                    </p>
                    <p>
                      <strong>Proposed Control:</strong> {finding.proposedMitigatingControl}
                    </p>
                    <p>
                      <strong>Impact Level:</strong> {finding.currentImpactLevel}
                    </p>
                    <p>
                      <strong>Likelihood:</strong> {finding.currentLikelihoodLevel}
                    </p>
                    <div
                      className="risk-badge"
                      style={{ backgroundColor: getRiskColor(finding.currentRiskLevel) }}
                    >
                      {finding.currentRiskLevel}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Section */}
            <div className="chat-section">
              <h3>Chat with Audit Assistant</h3>
              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <p style={{ color: "#999", textAlign: "center" }}>No messages yet. Ask a question about this audit!</p>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.role}`}>
                      <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>
                      <p style={{ margin: "5px 0 0 0" }}>{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
              <ChatInput onSendMessage={handleSendMessage} disabled={chatLoading} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AuditDetail
