"use client"
import { useState, useEffect } from "react"
import GovernanceSidebar from "../components/GovernanceSidebar"
import TopBar from "../components/TopBar"
import { useNavigate } from "react-router-dom"
import { getPastGovernanceReports } from "../api/governance"

const GovernanceHistory = () => {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchGovernanceReports()
  }, [])

  const fetchGovernanceReports = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching governance history...")
      const response = await getPastGovernanceReports()
      const reportsList = response.reports || response.data || []
      setReports(reportsList)
      console.log("[v0] Governance reports loaded:", reportsList.length, "reports")
    } catch (err) {
      console.error("[v0] Error fetching governance reports:", err)
      setError("Failed to load governance reports")
    } finally {
      setLoading(false)
    }
  }

  const handleReportClick = (checkId) => {
    localStorage.setItem("selectedGovernanceCheckId", checkId)
    navigate(`/governance-detail/${checkId}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div className="layout">
      <GovernanceSidebar />
      <main className="main-content">
        <TopBar />
        <div className="container-fluid p-4">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="text-dark">Governance History</h2>
              <p className="text-muted">View all past governance compliance assessments</p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError("")}></button>
            </div>
          )}

          {loading ? (
            <div className="alert alert-info">
              <i className="fa fa-spinner fa-spin me-2"></i>
              Loading governance reports...
            </div>
          ) : reports.length > 0 ? (
            <div className="row">
              {reports.map((report) => (
                <div key={report.check_id} className="col-lg-6 col-md-12 mb-4">
                  <div
                    className="card h-100"
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => handleReportClick(report.check_id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
                      e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none"
                      e.currentTarget.style.transform = "translateY(0)"
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title text-dark mb-0">
                          {report.scope?.compliance_scope || "Governance Assessment"}
                        </h5>
                        <span
                          style={{
                            backgroundColor: "#e3f2fd",
                            color: "#1976d2",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {report.results?.overall_compliance_score || 0}%
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-muted small mb-1">
                          <strong>Department:</strong> {report.scope?.department || "N/A"}
                        </p>
                        <p className="text-muted small mb-1">
                          <strong>Standards:</strong> {report.scope?.standards?.[0] || "N/A"}
                        </p>
                        <p className="text-muted small mb-1">
                          <strong>Created:</strong> {formatDate(report.created_at)}
                        </p>
                        <p className="text-muted small mb-0">
                          <strong>Completed:</strong> {formatDate(report.completed_at)}
                        </p>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex gap-2 flex-wrap">
                          {report.results?.findings?.map((finding) => (
                            <span
                              key={finding.findingId}
                              style={{
                                display: "inline-block",
                                backgroundColor:
                                  finding.riskLevel === "Critical"
                                    ? "#ffebee"
                                    : finding.riskLevel === "High"
                                      ? "#fff3e0"
                                      : "#fce4ec",
                                color:
                                  finding.riskLevel === "Critical"
                                    ? "#c62828"
                                    : finding.riskLevel === "High"
                                      ? "#e65100"
                                      : "#a1006b",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "500",
                              }}
                            >
                              {finding.area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <small className="text-muted d-block mb-2">
                          <strong>Check ID:</strong>
                        </small>
                        <code style={{ fontSize: "10px", backgroundColor: "#f5f5f5", padding: "4px 6px", borderRadius: "4px", display: "block", wordBreak: "break-all" }}>
                          {report.check_id}
                        </code>
                      </div>
                    </div>
                    <div className="card-footer bg-light" style={{ borderTop: "1px solid #e0e0e0" }}>
                      <button
                        className="btn btn-sm btn-primary w-100"
                        onClick={() => handleReportClick(report.check_id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              No governance reports found. Start a new assessment to see results here.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default GovernanceHistory
