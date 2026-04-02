"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  reassessRisks,
  completeAssessment,
  triggerRiskAssessment,
  getAssessmentStatus,
  sendChatMessage,
  downloadReport, // Added import for downloadReport
} from "../api/risk"
import Sidebar from "../components/Sidebar"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { CirclesWithBar } from "react-loader-spinner"

const RiskManagementStep3 = () => {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const roleModule = "risk"

  const [selectedRisks, setSelectedRisks] = useState([])
  const [aiInput, setAiInput] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [risks, setRisks] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [riskData, setRiskData] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    setSidebarRefreshTrigger((prev) => prev + 1)
  }

  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId)
  }

  const handleCancel = () => {
    navigate("/risk-management-step2")
  }

  useEffect(() => {
    const scopeId = localStorage.getItem("scopeId")
    if (!scopeId) {
      console.error("[v0] No scope ID found")
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No scope ID found. Please start from the beginning.",
        confirmButtonColor: "#3AC6BD",
      })
      return
    }

    const fetchRiskAssessment = async () => {
      console.log("[v0] Starting risk assessment workflow with scopeId:", scopeId)
      setLoading(true)

      try {
        console.log("[v0] Triggering risk assessment API...")
        const triggerResponse = await triggerRiskAssessment(scopeId)
        console.log("[v0] Risk assessment triggered:", triggerResponse)

        let isCompleted = false
        let pollCount = 0
        const maxPolls = 60

        while (!isCompleted && pollCount < maxPolls) {
          await new Promise((resolve) => setTimeout(resolve, 3000))
          pollCount++

          try {
            console.log(`[v0] Polling status... attempt ${pollCount}`)
            const statusResponse = await getAssessmentStatus(scopeId)
            console.log("[v0] Status response:", statusResponse)

            if (statusResponse.status === "completed" && statusResponse.risk_register) {
              console.log("[v0] Assessment completed! Risk register:", statusResponse.risk_register)
              setRiskData(statusResponse.risk_register)

              const risksList = statusResponse.risk_register.risks || []
              const transformedRisks = risksList.map((risk, index) => ({
                riskId: risk.riskId || `Risk-${index + 1}`,
                riskStatement: risk.riskStatement || risk.riskScenario || "",
                justification: risk.justification || risk.currentImpactLevelJustification || "",
                existingControlsInPlace: risk.existingControlsInPlace || "N/A",
                proposedMitigatingControl: Array.isArray(risk.proposedMitigatingControl)
                  ? risk.proposedMitigatingControl.join(", ")
                  : risk.proposedMitigatingControl || "",
                currentImpactLevel: risk.currentImpactLevel || "",
                currentImpactLevelJustification: risk.currentImpactLevelJustification || "",
                currentLikelihoodLevel: risk.currentLikelihoodLevel || "",
                currentLikelihoodLevelJustification: risk.currentLikelihoodLevelJustification || "",
                currentRiskLevel: risk.currentRiskLevel || "",
              }))
              console.log("[v0] Transformed risks:", transformedRisks)
              setRisks(transformedRisks)
              isCompleted = true
            }
          } catch (pollError) {
            console.error("[v0] Error polling status:", pollError.message)
          }
        }

        if (!isCompleted) {
          console.warn("[v0] Assessment polling timeout - no completion within max polls")
          Swal.fire({
            icon: "warning",
            title: "Assessment Timeout",
            text: "The assessment is taking longer than expected. Please try again later.",
            confirmButtonColor: "#3AC6BD",
          })
        }
      } catch (e) {
        console.error("[v0] Risk assessment error:", e.message)
        Swal.fire({
          icon: "error",
          title: "Failed to Load",
          text: "Failed to start risk assessment: " + e.message,
          confirmButtonColor: "#3AC6BD",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRiskAssessment()
  }, [])

  const handleRiskSelect = (riskId) => {
    setSelectedRisks((prev) => (prev.includes(riskId) ? prev.filter((id) => id !== riskId) : [...prev, riskId]))
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRisks(risks.map((risk) => risk.riskId))
    } else {
      setSelectedRisks([])
    }
  }

  const handleAiSubmit = async (e) => {
    e.preventDefault()
    try {
      const scopeId = localStorage.getItem("scopeId")
      if (aiInput || selectedRisks.length) {
        await reassessRisks({ assessmentId: scopeId, riskIds: selectedRisks, prompt: aiInput })
      }
      await completeAssessment(scopeId)

      Swal.fire({
        icon: "success",
        title: "Assessment Complete!",
        text: "Risk assessment has been completed successfully.",
        confirmButtonColor: "#3AC6BD",
      }).then(() => {
        navigate("/risk-management-final")
      })
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Assessment Failed",
        text: e.message || "Failed to complete assessment",
        confirmButtonColor: "#3AC6BD",
      })
    }
  }

  const handleDownload = async () => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Download Report",
        text: "Downloading this report will deduct 5 coins from your account. Do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2ed2c9",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, download it!",
        cancelButtonText: "Cancel",
      })

      if (result.isConfirmed) {
        // User confirmed, proceed with download
        const scopeId = localStorage.getItem("scopeId")
        const downloadUrl = await downloadReport(scopeId)

        // Create a temporary anchor element to trigger download
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = `Risk_Report_${scopeId}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Clean up the blob URL
        window.URL.revokeObjectURL(downloadUrl)

        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Your report is being downloaded.",
          icon: "success",
          confirmButtonColor: "#2ed2c9",
        })

        // Dispatch custom event to refresh balance in TopBar
        window.dispatchEvent(new Event("refreshBalance"))
      }
    } catch (error) {
      console.error("[v0] Error downloading report:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to download report. Please try again.",
        icon: "error",
        confirmButtonColor: "#2ed2c9",
      })
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const scopeId = localStorage.getItem("scopeId")
    if (!scopeId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No scope ID found",
        confirmButtonColor: "#2ed2c9",
      })
      return
    }

    try {
      setChatLoading(true)
      const userMessage = chatInput
      setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
      setChatInput("")

      console.log("[v0] Sending chat message:", userMessage)
      const response = await sendChatMessage(scopeId, userMessage)
      console.log("[v0] Chat response:", response)

      setChatMessages((prev) => [...prev, { role: "assistant", content: response.assistant_reply }])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      Swal.fire({
        title: "Error",
        text: "Failed to send message: " + error.message,
        icon: "error",
        confirmButtonColor: "#2ed2c9",
      })
    } finally {
      setChatLoading(false)
    }
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
          margin: 0;
          background-color: var(--bg-light);
          color: var(--text-light);
          transition: all 0.3s ease;
        }

        .table th {
          background: #fafafa;
          font-weight: 600;
          font-size: 12px;
        }

        .table td {
          font-size: 13px;
          vertical-align: middle;
        }

        .badge-high {
          background-color: #ff6b6b;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-low {
          background-color: #51cf66;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-med {
          background-color: #ffd43b;
          color: #333;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-critical {
          background-color: #ff4757;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-severe {
          background-color: #ff7675;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-medium {
          background-color: #ffd43b;
          color: #333;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .badge-likely {
          background-color: #ff6b6b;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .badge-unlikely {
          background-color: #51cf66;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .badge-rare {
          background-color: #74c0fc;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .download-btn {
          float: right;
          background-color: #2ed2c9;
          color: white;
          border-radius: 50px;
          padding: 8px 18px;
          border: none;
        }

        .ai-box {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          align-items: center;
          background-color: #fafafa;
        }

        .ai-box input {
          border: none;
          background: none;
          flex: 1;
          outline: none;
        }

        .ai-actions i {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }

        .btn-submit {
          background-color: #2ed2c9;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
        }

        .btn-cancel {
          background-color: #f1f1f1;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          margin-right: 8px;
        }

        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .loader-text {
          margin-top: 15px;
          font-size: 14px;
          color: #666;
        }

        /* Added chat styles */
        .chat-container {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #fafafa;
          margin-top: 20px;
          padding: 15px;
        }

        .chat-messages {
          height: 300px;
          overflow-y: auto;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .chat-message {
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
        }

        .chat-message.user {
          align-items: flex-end;
        }

        .chat-message.assistant {
          align-items: flex-start;
        }

        .message-content {
          max-width: 70%;
          padding: 10px 12px;
          border-radius: 6px;
          word-wrap: break-word;
        }

        .message-content.user {
          background-color: #3AC6BD;
          color: white;
        }

        .message-content.assistant {
          background-color: #e8f5f3;
          color: #333;
        }

        .chat-input-form {
          display: flex;
          gap: 10px;
        }

        .chat-input-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          outline: none;
        }

        .chat-input-form button {
          background-color: #3AC6BD;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          cursor: pointer;
        }

        .chat-input-form button:disabled {
          background-color: #bbb;
          cursor: not-allowed;
        }
      `}</style>

      <main className="main">
        <Sidebar />

        <div className="main2">
          <div className="middle">
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/risk-management-step2" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 3 of 4: Risk Assessment Result Validation</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <Link to="/risk-management-final" className="btn btn-outline-secondary btn-nav">
                  Next →
                </Link>
              </div>
            </div>

            <div className="form-card">
              <div className="page-container">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6>Risk Register</h6>
                    <p className="text-muted">Please Provided Details</p>
                  </div>
                  <div>
                    <button className="download-btn" onClick={handleDownload} disabled={loading}>
                      <i className="fa fa-download me-1"></i> Download
                    </button>
                  </div>
                </div>

                <div className="table-responsive mt-4">
                  {risks.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "400px",
                      }}
                    >
                      <CirclesWithBar
                        height="100"
                        width="100"
                        color="#3AC6BD"
                        outerCircleColor="#3AC6BD"
                        innerCircleColor="#3AC6BD"
                        barColor="#3AC6BD"
                        ariaLabel="circles-with-bar-loading"
                        visible={true}
                      />
                      <p style={{ marginTop: "20px", fontSize: "16px", color: "#333", fontWeight: "500" }}>
                        Risk assessment is processing... This may take a few moments.......
                      </p>
                    </div>
                  ) : (
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={selectedRisks.length === risks.length && risks.length > 0}
                            />
                          </th>
                          <th>Risk ID</th>
                          <th>Risk Statement</th>
                          <th>Impact Level</th>
                          <th>Likelihood Level</th>
                          <th>Risk Level</th>
                          <th>Existing Controls</th>
                          <th>Proposed Control</th>
                        </tr>
                      </thead>
                      <tbody>
                        {risks.map((risk) => (
                          <tr key={risk.riskId}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRisks.includes(risk.riskId)}
                                onChange={() => handleRiskSelect(risk.riskId)}
                              />
                            </td>
                            <td>
                              <strong>{risk.riskId}</strong>
                            </td>
                            <td title={risk.riskStatement} style={{ maxWidth: "250px", cursor: "pointer" }}>
                              {risk.riskStatement.substring(0, 80)}...
                            </td>
                            <td>
                              <span className={`badge-${risk.currentImpactLevel.toLowerCase()}`}>
                                {risk.currentImpactLevel}
                              </span>
                            </td>
                            <td>
                              <span className={`badge-${risk.currentLikelihoodLevel.toLowerCase()}`}>
                                {risk.currentLikelihoodLevel}
                              </span>
                            </td>
                            <td>
                              <span className={`badge-${risk.currentRiskLevel.toLowerCase()}`}>
                                {risk.currentRiskLevel}
                              </span>
                            </td>
                            <td title={risk.existingControlsInPlace} style={{ maxWidth: "200px" }}>
                              {risk.existingControlsInPlace.substring(0, 50)}...
                            </td>
                            <td title={risk.proposedMitigatingControl} style={{ maxWidth: "200px" }}>
                              {risk.proposedMitigatingControl.substring(0, 50)}...
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2 text-dark">
                  <span>
                    Items per page:
                    <select
                      className="form-select d-inline-block"
                      style={{ width: "auto" }}
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                    1-{Math.min(itemsPerPage, risks.length)} of {risks.length} items
                  </span>
                  <nav>
                    <ul className="pagination pagination-sm mb-0 mt-0">
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page - 1)}>
                          ‹
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page + 1)}>
                          ›
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="chat-container">
                  <h6>Risk Assessment Chat</h6>
                  <p className="text-muted" style={{ fontSize: "12px" }}>
                    Ask questions about the risk assessment
                  </p>

                  <div className="chat-messages">
                    {chatMessages.length === 0 ? (
                      <div style={{ textAlign: "center", color: "#999", paddingTop: "50px" }}>
                        <p>No messages yet. Ask a question about the risks!</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role}`}>
                          <div className={`message-content ${msg.role}`}>{msg.content}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleChatSubmit} className="chat-input-form">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask a question about the risks..."
                      disabled={chatLoading}
                    />
                    <button type="submit" disabled={chatLoading}>
                      {chatLoading ? "Sending..." : "Send"}
                    </button>
                  </form>
                </div>

                <div className="mt-5">
                  <form onSubmit={handleAiSubmit}>
                    <div className="mt-3 text-center">
                      <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-submit" disabled={loading}>
                        Complete Assessment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default RiskManagementStep3
