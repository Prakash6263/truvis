"use client"
import { useEffect, useState } from "react"
import GovernanceSidebar from "../components/GovernanceSidebar"
import TopBar from "../components/TopBar"
import ChatInput from "../components/ChatInput"
import { Link, useNavigate } from "react-router-dom"
import { getGovernanceCheck, submitGovernanceResults, downloadGovernanceReport, sendGovernanceChat } from "../api/governance"
import Swal from "sweetalert2"

const AIGovernanceComplianceStep4 = () => {
  const navigate = useNavigate()
  const [governanceResults, setGovernanceResults] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    const checkId = localStorage.getItem("governanceCheckId")
    if (!checkId) {
      setError("Check ID not found. Please start from step 1.")
      return
    }

    // Fetch governance check results
    fetchGovernanceResults(checkId)
  }, [])

  const fetchGovernanceResults = async (checkId) => {
    setLoading(true)
    try {
      console.log("[v0] STEP 4A: Fetching governance check results for check ID:", checkId)
      const response = await getGovernanceCheck(checkId)
      console.log("[v0] STEP 4A SUCCESS: Governance check results:", response)
      
      setGovernanceResults(response)
      localStorage.setItem("governanceCheckResults", JSON.stringify(response))
      
      // Auto-submit results if status indicates it's complete
      if (response.status === "completed" || response.overall_score) {
        handleSubmitResults(checkId)
      }
    } catch (err) {
      console.error("[v0] STEP 4A FAILED: Error fetching governance results:", err)
      setError(err.response?.data?.detail || "Failed to load governance results. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitResults = async (checkId) => {
    try {
      console.log("[v0] STEP 4B: Submitting governance results for check ID:", checkId)
      const response = await submitGovernanceResults(checkId)
      console.log("[v0] STEP 4B SUCCESS: Results submitted:", response)
    } catch (err) {
      console.error("[v0] STEP 4B FAILED: Error submitting results:", err)
      // Don't stop the flow if submission fails
    }
  }

  const handleSendMessage = async (message) => {
    if (!message.trim()) {
      return
    }

    try {
      setChatLoading(true)
      
      // Add user message to chat
      const userMsg = { role: "user", content: message }
      setChatMessages((prev) => [...prev, userMsg])

      // Get check ID from localStorage
      const checkId = localStorage.getItem("governanceCheckId")
      if (!checkId) {
        throw new Error("Check ID not found")
      }

      // Send message to governance chat API
      console.log("[v0] STEP 4 CHAT: Sending message:", message)
      const response = await sendGovernanceChat(checkId, message)
      console.log("[v0] STEP 4 CHAT: Response received:", response)

      // Add assistant response to chat
      const assistantMsg = {
        role: "assistant",
        content: response.reply,
      }
      setChatMessages((prev) => [...prev, assistantMsg])

      // Log remaining coins if available
      if (response.remaining_coins !== undefined) {
        console.log("[v0] Remaining coins:", response.remaining_coins)
      }
    } catch (err) {
      console.error("[v0] STEP 4 CHAT FAILED: Chat error:", err)
      Swal.fire({
        icon: "error",
        title: "Chat Error",
        text: err.response?.data?.detail || "Failed to send message. Please try again.",
        confirmButtonColor: "#dc3545",
      })
    } finally {
      setChatLoading(false)
    }
  }

  const handleNewAudit = () => {
    // Clear all stored data
    localStorage.removeItem("governanceCheckId")
    localStorage.removeItem("governanceScope")
    localStorage.removeItem("governanceUploadResponse")
    localStorage.removeItem("governanceReasoningData")
    localStorage.removeItem("governanceCheckResults")
    navigate("/dashboard")
  }

  const handleBack = () => {
    navigate("/ai-governance-compliance-step3")
  }

  const handleRetry = async () => {
    const checkId = localStorage.getItem("governanceCheckId")
    if (checkId) {
      await fetchGovernanceResults(checkId)
    }
  }

  const downloadReport = async () => {
    const checkId = localStorage.getItem("governanceCheckId")
    if (!checkId) return

    try {
      console.log("[v0] STEP 4C: Downloading governance report for check ID:", checkId)
      const blob = await downloadGovernanceReport(checkId)

      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute(
        "download",
        `AI_Governance_Report_${checkId}.pdf`
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      
      console.log("[v0] STEP 4C SUCCESS: Report downloaded successfully")
    } catch (error) {
      console.error("[v0] STEP 4C FAILED: Download failed:", error)
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download AI governance report. " + (error.response?.data?.detail || error.message),
      })
    }
  }

  const getFindings = () => {
    return governanceResults?.report?.results?.findings || []
  }

  const getHighPriorityCount = () => {
    return getFindings().filter((f) => f.riskLevel === "Critical" || f.riskLevel === "High").length || 0
  }

  const getMediumPriorityCount = () => {
    return getFindings().filter((f) => f.riskLevel === "Medium").length || 0
  }

  const getLowPriorityCount = () => {
    return getFindings().filter((f) => f.riskLevel === "Low").length || 0
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
        <GovernanceSidebar />

        <div className="main2">
          <TopBar />

          <div className="middle">
            {/* Step Header */}
            <div className="container text-center">
              <div className="d-flex justify-content-between align-items-center mt-5">
                <Link to="/ai-governance-compliance-step3" className="btn btn-outline-secondary btn-nav">
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
                  {loading && <button className="btn btn-sm btn-primary ms-2" onClick={handleRetry}>Retry</button>}
                </div>
              )}

              {loading && (
                <div className="alert alert-info">
                  <i className="fa fa-spinner fa-spin me-2"></i>
                  Loading governance check results...
                </div>
              )}

              {governanceResults && (
                <>
                  {/* Completion Card */}
                  <div className="completion-card">
                    <div className="completion-icon">✅</div>
                    <h3>AI Governance Assessment Complete!</h3>
                    <p>
                      Your comprehensive AI governance audit has been successfully completed. Review the summary below for key findings
                      and governance recommendations.
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="summary-card">
                    <h6 className="text-dark">Assessment Overview</h6>
                    <p className="text-dark">{governanceResults.report?.results?.overall_summary || governanceResults.overall_summary || "AI governance assessment completed."}</p>
                  </div>

                  {/* Summary Card */}
                  <div className="summary-card">
                    <h5 className="text-dark mb-4">Assessment Summary</h5>

                    <div className="metric-item">
                      <span>Check ID:</span>
                      <span className="metric-value" style={{ fontSize: "11px" }}>{governanceResults.check_id || governanceResults.report?.check_id}</span>
                    </div>

                    <div className="metric-item">
                      <span>Compliance Scope:</span>
                      <span className="metric-value">{governanceResults.compliance_scope || governanceResults.report?.scope?.compliance_scope}</span>
                    </div>

                    <div className="metric-item">
                      <span>Overall Compliance Score:</span>
                      <span className="metric-value">{governanceResults.report?.results?.overall_compliance_score || governanceResults.overall_score}%</span>
                    </div>

                    <div className="metric-item">
                      <span>Total Findings:</span>
                      <span className="metric-value">{getFindings().length}</span>
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
                  {getFindings().length > 0 && (
                    <div className="summary-card">
                      <h6 className="text-dark mb-3">Detailed Findings</h6>
                      <div className="table-responsive">
                        <table className="table table-sm table-hover">
                          <thead>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Finding ID</th>
                              <th style={{ fontWeight: "600" }}>Governance Area</th>
                              <th style={{ fontWeight: "600" }}>Compliance Status</th>
                              <th style={{ fontWeight: "600" }}>Risk Level</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFindings().map((finding, idx) => (
                              <tr key={idx} style={{ borderBottom: "1px solid #e0e0e0" }}>
                                <td style={{ fontWeight: "bold", color: "#2ed2c9" }}>{finding.findingId}</td>
                                <td style={{ fontSize: "13px", fontWeight: "500" }}>{finding.area}</td>
                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        finding.complianceStatus === "Compliant"
                                          ? "#28a745"
                                          : "#dc3545",
                                      color: "white",
                                      padding: "6px 12px",
                                      borderRadius: "6px",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {finding.complianceStatus}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    style={{
                                      backgroundColor:
                                        finding.riskLevel === "Critical"
                                          ? "#d32f2f"
                                          : finding.riskLevel === "High"
                                            ? "#ff6f00"
                                            : finding.riskLevel === "Medium"
                                              ? "#ffc107"
                                              : "#28a745",
                                      color: finding.riskLevel === "Medium" ? "#333" : "white",
                                      padding: "6px 12px",
                                      borderRadius: "6px",
                                      fontSize: "12px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {finding.riskLevel}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Detailed Recommendations Section */}
                      <div className="mt-4">
                        <h6 className="text-dark mb-3">Detailed Recommendations</h6>
                        {getFindings().map((finding, idx) => (
                          <div key={idx} style={{ marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #e0e0e0" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                              <span style={{ fontWeight: "bold", color: "#2ed2c9", marginRight: "10px" }}>
                                Finding {finding.findingId}:
                              </span>
                              <span style={{ fontWeight: "600", color: "#333" }}>{finding.area}</span>
                            </div>
                            
                            <div style={{ marginBottom: "8px" }}>
                              <strong style={{ color: "#555" }}>Gap Description:</strong>
                              <p style={{ margin: "5px 0", fontSize: "13px", color: "#666", marginLeft: "10px" }}>
                                {finding.gapDescription}
                              </p>
                            </div>
                            
                            <div style={{ marginBottom: "8px" }}>
                              <strong style={{ color: "#555" }}>Recommendation:</strong>
                              <p style={{ margin: "5px 0", fontSize: "13px", color: "#2ed2c9", marginLeft: "10px", fontWeight: "500" }}>
                                {finding.recommendation}
                              </p>
                            </div>
                            
                            <div style={{ marginBottom: "8px" }}>
                              <strong style={{ color: "#555" }}>Risk Justification:</strong>
                              <p style={{ margin: "5px 0", fontSize: "13px", color: "#666", marginLeft: "10px" }}>
                                {finding.riskJustification}
                              </p>
                            </div>
                            
                            {finding.referenceStandards && finding.referenceStandards.length > 0 && (
                              <div>
                                <strong style={{ color: "#555" }}>Reference Standards:</strong>
                                <div style={{ margin: "5px 0", marginLeft: "10px" }}>
                                  {finding.referenceStandards.map((standard, sidx) => (
                                    <span
                                      key={sidx}
                                      style={{
                                        display: "inline-block",
                                        backgroundColor: "#f0f0f0",
                                        color: "#333",
                                        padding: "4px 10px",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        marginRight: "8px",
                                        marginBottom: "5px",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {standard}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
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
                      Back to Dashboard
                    </button>
                  </div>

                  {/* Governance Recommendations */}
                  <div className="summary-card mt-4">
                    <h6 className="text-dark">AI Governance Recommendations:</h6>
                    <ul className="text-dark">
                      <li>Review all Critical and High priority governance gaps immediately</li>
                      <li>Develop comprehensive AI governance policies and procedures</li>
                      <li>Establish AI ethics review boards and oversight mechanisms</li>
                      <li>Implement model governance and lifecycle management processes</li>
                      <li>Schedule follow-up governance assessment in 3-6 months</li>
                    </ul>
                  </div>

                  {/* Chat Section */}
                  <div className="summary-card mt-4">
                    <h6 className="text-dark mb-3">Ask AI About Your Governance Assessment</h6>
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
                          No messages yet. Ask a question about your AI governance findings.
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
        {governanceResults && (
          <ChatInput onSendMessage={handleSendMessage} disabled={chatLoading || !governanceResults} />
        )}
      </main>
    </>
  )
}

export default AIGovernanceComplianceStep4
