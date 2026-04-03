"use client"
import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import ChatInput from "../components/ChatInput"
import { Link, useNavigate } from "react-router-dom"
import { sendAuditChat } from "../api/audit"
import Swal from "sweetalert2"

const AuditComplianceStep4 = () => {
  const navigate = useNavigate()
  const [auditResults, setAuditResults] = useState(null)
  const [error, setError] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    // Load audit results from localStorage
    const results = localStorage.getItem("auditResults")
    if (results) {
      try {
        setAuditResults(JSON.parse(results))
      } catch (err) {
        console.error("[v0] Error parsing audit results:", err)
        setError("Failed to load audit results")
      }
    } else {
      setError("Audit results not found. Please complete the audit analysis.")
    }
  }, [])

  const handleSendMessage = async (message) => {
    if (!message.trim() || !auditResults?.audit_id) {
      return
    }

    try {
      setChatLoading(true)
      
      // Add user message to chat
      const userMsg = { role: "user", content: message }
      setChatMessages((prev) => [...prev, userMsg])

      // Send message to API
      const response = await sendAuditChat(auditResults.audit_id, message)

      // Add assistant response to chat
      const assistantMsg = {
        role: "assistant",
        content: response.assistant_reply,
      }
      setChatMessages((prev) => [...prev, assistantMsg])

      // Update remaining coins if needed
      if (response.remaining_coins !== undefined) {
        console.log("[v0] Remaining coins:", response.remaining_coins)
      }
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

  const handleNewAudit = () => {
    // Clear all stored data
    localStorage.removeItem("auditId")
    localStorage.removeItem("extractedPreview")
    localStorage.removeItem("auditResults")
    navigate("/audit-compliance")
  }

  const handleBack = () => {
    navigate("/audit-compliance-step3")
  }

  const downloadReport = () => {
    if (!auditResults) return

    const reportContent = `
AUDIT COMPLIANCE REPORT
========================

Audit ID: ${auditResults.audit_id}
Status: ${auditResults.status}
Overview: ${auditResults.overview}

FINDINGS SUMMARY
================
Total Findings: ${auditResults.findings?.length || 0}

${auditResults.findings
  ?.map(
    (finding) => `
Risk ID: ${finding.riskId}
Risk Statement: ${finding.riskStatement}
Severity: ${finding.currentImpactLevel}
Risk Level: ${finding.currentRiskLevel}
Justification: ${finding.justification}
Proposed Mitigation: ${finding.proposedMitigatingControl}
---`
  )
  .join("\n")}

REASONING STEPS
===============
${auditResults.reasoning_steps?.map((step, idx) => `${idx + 1}. ${step}`).join("\n\n")}
    `

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportContent))
    element.setAttribute("download", `audit-report-${auditResults.audit_id}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getHighPriorityCount = () => {
    return auditResults?.findings?.filter((f) => f.currentRiskLevel === "Critical" || f.currentRiskLevel === "High")
      .length || 0
  }

  const getMediumPriorityCount = () => {
    return auditResults?.findings?.filter((f) => f.currentRiskLevel === "Medium").length || 0
  }

  const getLowPriorityCount = () => {
    return auditResults?.findings?.filter((f) => f.currentRiskLevel === "Low").length || 0
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

        .form-card .btn-cancel {
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 13px;
          padding: 8px 20px;
        }

        .form-card .btn-submit {
          background: #2ed2c9;
          color: white;
          border-radius: 6px;
          font-size: 13px;
          padding: 8px 20px;
          border: none;
        }

        .completion-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          border-radius: 15px;
          text-align: center;
          margin: 20px 0;
        }

        .completion-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .summary-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }

        .metric-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .metric-item:last-child {
          border-bottom: none;
        }

        .metric-value {
          font-weight: bold;
          color: #2ed2c9;
        }
      `}</style>

      <main className="main">
        <Sidebar />

        <div className="main2">
          <TopBar />

          <div className="middle">
            {/* Step Header */}
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/audit-compliance-step3" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 4 of 4: Final Report</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-outline-secondary btn-nav" style={{ visibility: "hidden" }}>
                  Next →
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              {auditResults && (
                <>
                  {/* Completion Card */}
                  <div className="completion-card">
                    <div className="completion-icon">✅</div>
                    <h3>Audit Compliance Assessment Complete!</h3>
                    <p>
                      Your comprehensive audit has been successfully completed. Review the summary below for key findings
                      and recommendations.
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="summary-card">
                    <h6 className="text-dark">Audit Overview</h6>
                    <p className="text-dark">{auditResults.overview}</p>
                  </div>

                  {/* Summary Card */}
                  <div className="summary-card">
                    <h5 className="text-dark mb-4">Audit Summary</h5>

                    <div className="metric-item">
                      <span>Audit ID:</span>
                      <span className="metric-value" style={{ fontSize: "11px" }}>{auditResults.audit_id}</span>
                    </div>

                    <div className="metric-item">
                      <span>Total Findings:</span>
                      <span className="metric-value">{auditResults.findings?.length || 0}</span>
                    </div>

                    <div className="metric-item">
                      <span>Critical/High Priority Issues:</span>
                      <span className="metric-value">{getHighPriorityCount()}</span>
                    </div>

                    <div className="metric-item">
                      <span>Medium Priority Issues:</span>
                      <span className="metric-value">{getMediumPriorityCount()}</span>
                    </div>

                    <div className="metric-item">
                      <span>Low Priority Issues:</span>
                      <span className="metric-value">{getLowPriorityCount()}</span>
                    </div>
                  </div>

                  {/* Detailed Findings */}
                  {auditResults.findings && auditResults.findings.length > 0 && (
                    <div className="summary-card">
                      <h6 className="text-dark mb-3">Detailed Findings</h6>
                      <div className="table-responsive">
                        <table className="table table-sm table-hover">
                          <thead>
                            <tr>
                              <th>Risk ID</th>
                              <th>Risk Statement</th>
                              <th>Severity</th>
                              <th>Risk Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditResults.findings.map((finding, idx) => (
                              <tr key={idx}>
                                <td>{finding.riskId}</td>
                                <td style={{ fontSize: "12px" }}>{finding.riskStatement}</td>
                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        finding.currentImpactLevel === "High"
                                          ? "#ff4d4d"
                                          : finding.currentImpactLevel === "Critical"
                                            ? "#d32f2f"
                                            : "#ffc107",
                                      color: finding.currentImpactLevel === "High" || finding.currentImpactLevel === "Critical" ? "white" : "#333",
                                      padding: "4px 8px",
                                      borderRadius: "4px",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {finding.currentImpactLevel}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        finding.currentRiskLevel === "Critical"
                                          ? "#d32f2f"
                                          : finding.currentRiskLevel === "High"
                                            ? "#ff4d4d"
                                            : finding.currentRiskLevel === "Medium"
                                              ? "#ffc107"
                                              : "#28a745",
                                      color:
                                        finding.currentRiskLevel === "Critical" ||
                                        finding.currentRiskLevel === "High" ||
                                        finding.currentRiskLevel === "Medium"
                                          ? "#fff"
                                          : "#fff",
                                      padding: "4px 8px",
                                      borderRadius: "4px",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {finding.currentRiskLevel}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="text-center mt-5">
                    <button className="btn btn-success me-3" onClick={downloadReport}>
                      <i className="fa fa-download me-2"></i>
                      Download Full Report
                    </button>
                    <button className="btn-submit" onClick={handleNewAudit}>
                      Start New Audit
                    </button>
                  </div>

                  {/* Next Steps */}
                  <div className="summary-card mt-4">
                    <h6 className="text-dark">Recommended Next Steps:</h6>
                    <ul className="text-dark">
                      <li>Review all Critical and High priority findings immediately</li>
                      <li>Develop remediation plans for identified risks</li>
                      <li>Assign ownership and timelines for each finding</li>
                      <li>Schedule follow-up audit in 3-6 months</li>
                      <li>Implement controls to address high-risk areas</li>
                    </ul>
                  </div>

                  {/* Chat Section */}
                  <div className="summary-card mt-4">
                    <h6 className="text-dark mb-3">Ask AI About Your Audit</h6>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        padding: "15px",
                        maxHeight: "400px",
                        overflowY: "auto",
                        marginBottom: "15px",
                        minHeight: "200px",
                      }}
                    >
                      {chatMessages.length === 0 ? (
                        <p className="text-muted text-center" style={{ paddingTop: "80px" }}>
                          No messages yet. Ask a question about your audit findings.
                        </p>
                      ) : (
                        chatMessages.map((msg, idx) => (
                          <div
                            key={idx}
                            style={{
                              marginBottom: "12px",
                              padding: "10px",
                              borderRadius: "6px",
                              backgroundColor: msg.role === "user" ? "#3AC6BD" : "#e0e0e0",
                              color: msg.role === "user" ? "white" : "#333",
                              marginLeft: msg.role === "user" ? "20px" : "0",
                              marginRight: msg.role === "assistant" ? "20px" : "0",
                              wordWrap: "break-word",
                            }}
                          >
                            <strong>{msg.role === "user" ? "You: " : "AI: "}</strong>
                            {msg.content}
                          </div>
                        ))
                      )}
                      {chatLoading && (
                        <div style={{ textAlign: "center", padding: "10px" }}>
                          <span className="spinner-border spinner-border-sm" style={{ color: "#3AC6BD" }}></span>
                        </div>
                      )}
                    </div>
                    <ChatInput onSendMessage={handleSendMessage} disabled={chatLoading} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat Input at bottom */}
        {auditResults && (
          <ChatInput onSendMessage={handleSendMessage} disabled={chatLoading || !auditResults} />
        )}
      </main>
    </>
  )
}

export default AuditComplianceStep4
