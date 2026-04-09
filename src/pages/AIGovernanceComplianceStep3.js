"use client"

import { useState, useEffect } from "react"
import GovernanceSidebar from "../components/GovernanceSidebar"
import TopBar from "../components/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { runComplianceReasoning } from "../api/governance"

const AIGovernanceComplianceStep3 = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")
  const [auditData, setAuditData] = useState(null)
  const [findings, setFindings] = useState([])
  const [reasoningSteps, setReasoningSteps] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const checkId = localStorage.getItem("governanceCheckId")
    if (!checkId) {
      setError("Check ID not found. Please start from step 1.")
      return
    }

    // Start the reasoning process
    initializeGovernanceReasoning(checkId)
  }, [])

  const initializeGovernanceReasoning = async (checkId) => {
    setLoading(true)
    try {
      console.log("[v0] STEP 3: Starting AI governance reasoning for check ID:", checkId)
      const response = await runComplianceReasoning(checkId)
      console.log("[v0] STEP 3: Reasoning response received:", response)
      
      // Check if response has the proper structure (findings_preview and reasoning_steps directly)
      if (response && response.status === "reasoning_completed") {
        setAuditData(response)
        
        // Extract findings from findings_preview
        if (response.findings_preview && Array.isArray(response.findings_preview)) {
          setFindings(response.findings_preview)
          console.log("[v0] STEP 3: Found", response.findings_preview.length, "findings")
        }
        
        // Extract reasoning steps
        if (response.reasoning_steps && Array.isArray(response.reasoning_steps)) {
          setReasoningSteps(response.reasoning_steps)
          console.log("[v0] STEP 3: Found", response.reasoning_steps.length, "reasoning steps")
        }

        // Store data for Step 4
        localStorage.setItem("governanceReasoningData", JSON.stringify(response))
        setProcessing(false)
        setLoading(false)
      } else {
        setError("Unexpected response structure from governance reasoning. Please try again.")
        setLoading(false)
      }
    } catch (err) {
      console.error("[v0] STEP 3 FAILED: Error starting AI governance reasoning:", err)
      setError(err.response?.data?.detail || "Failed to start AI governance reasoning. Please try again.")
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const checkId = localStorage.getItem("governanceCheckId")
    if (!checkId) {
      setError("Check ID not found. Please start from step 1.")
      return
    }

    try {
      setLoading(true)
      console.log("[v0] STEP 3: Proceeding to step 4 with check ID:", checkId)
      navigate("/ai-governance-compliance-step4")
    } catch (err) {
      console.error("[v0] STEP 3 Error:", err)
      setError(err.response?.data?.detail || "Failed to proceed. You can still proceed to view results.")
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate("/ai-governance-compliance-step2")
  }

  const getSeverityBadge = (level) => {
    const levelLower = level?.toLowerCase()
    if (levelLower === "critical") return "badge-danger"
    if (levelLower === "high") return "badge-high"
    if (levelLower === "medium") return "badge-mid"
    return "badge-low"
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

        .badge-high { 
          background-color: #ff4d4d; 
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }
        
        .badge-low { 
          background-color: #28a745; 
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
        }
        
        .badge-mid { 
          background-color: #ffc107; 
          color: #333;
          padding: 5px 10px;
          border-radius: 6px;
        }

        .table thead th {
          background: #fff;
          font-weight: 600;
        }

        .accordion-button:not(.collapsed) {
          background-color: #f1fdf6;
          color: #000;
        }

        .search-box {
          border: 1px solid #ddd;
          padding: 6px 12px;
          border-radius: 6px;
          width: 100%;
        }

        .table td, .table th {
          vertical-align: middle;
        }

        .bg-success-subtle {
          background-color: #DCFCE7 !important;
          margin: 10px;
        }

        .accordion-button:not(.collapsed) {
          background-color: #ffffff;
          color: #000;
          font-weight: bold;
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
                <Link to="/ai-governance-compliance-step2" className="btn btn-outline-secondary btn-nav">
                  ← Back
                </Link>
                <div>
                  <div className="step-header">Step 3 of 4: Analysis Results</div>
                  <div className="progress-indicator">
                    <div className="progress-bar-custom">
                      <div className="progress-bar-fill" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <Link className="btn btn-outline-secondary btn-nav" to="/ai-governance-compliance-step4">
                  Next →
                </Link>
              </div>
            </div>

            {/* Form Card */}
            <div className="form-card">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                  <h6 className="mb-0 fw-bold text-dark">AI Governance Analysis</h6>
                  <small className="text-dark">AI Governance Reasoning Overview</small>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              {loading && (
                <div className="alert alert-info">
                  <i className="fa fa-spinner fa-spin me-2"></i>
                  {processing ? "Analyzing AI governance findings..." : "Loading analysis results..."}
                </div>
              )}

              {!loading && auditData && (
                <>
                  <div className="text-center text-dark mb-5">
                    <p>
                      The AI governance analysis has identified several compliance areas that require attention. The findings below
                      represent potential governance gaps and recommendations for your organization's AI maturity.
                    </p>
                    <p>
                      Each finding has been categorized by severity level to help prioritize remediation efforts. Please
                      review the detailed recommendations for each identified issue.
                    </p>
                  </div>

                  {/* Detail Finding Table */}
                  {findings.length > 0 && (
                    <div className="table-responsive bg-white p-2 rounded mb-4">
                      <table className="table align-middle mb-0 table-sm">
                        <thead>
                          <tr>
                            <th>Finding ID</th>
                            <th>Governance Area</th>
                            <th>Compliance Status</th>
                            <th>Risk Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {findings.map((finding, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: "bold" }}>{finding.findingId}</td>
                              <td style={{ fontSize: "13px", fontWeight: "500" }}>{finding.area}</td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor: finding.complianceStatus === "Compliant" ? "#28a745" : "#dc3545",
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
                  )}
                </>
              )}

              {!loading && auditData && reasoningSteps.length > 0 && (
                <div className="bg-light p-2 rounded mt-3">
                  <div className="shadow rounded p-2 bg-white">
                    {/* Search */}
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Search governance reasoning steps or findings..."
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Accordion */}
                    <div className="accordion mt-3" id="accordionExample">
                      {reasoningSteps
                        .filter((step) => step.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((step, idx) => (
                          <div className="accordion-item" key={idx}>
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#step${idx}`}
                              >
                                {`Step ${idx + 1}`}
                              </button>
                            </h2>
                            <div id={`step${idx}`} className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}>
                              <div className="accordion-body bg-success-subtle">
                                {step}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Footer buttons */}
                    <div className="d-flex mt-3">
                      <button className="btn btn-outline-secondary me-3" onClick={handleBack}>
                        Back
                      </button>
                      <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Processing..." : "Proceed to Next Step"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AIGovernanceComplianceStep3
