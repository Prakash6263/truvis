import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { logout } from "../utils/auth"
import { getPastGovernanceReports } from "../api/governance"

const GovernanceSidebar = ({
  isCollapsed,
  onToggle,
}) => {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAllReports, setShowAllReports] = useState(false)

  useEffect(() => {
    fetchGovernanceHistory()
  }, [])

  const fetchGovernanceHistory = async () => {
    try {
      setLoading(true)
      const response = await getPastGovernanceReports()
      // Handle both format possibilities
      const reportsList = response.reports || response.data || []
      setReports(reportsList)
      console.log("[v0] Governance history fetched:", reportsList)
    } catch (error) {
      console.error("[v0] Failed to fetch governance history:", error)
      setReports([])
    } finally {
      setLoading(false)
    }
  }

  const handleReportClick = (checkId) => {
    // Store selected check ID and navigate to governance detail view
    localStorage.setItem("selectedGovernanceCheckId", checkId)
    navigate(`/governance-detail/${checkId}`)
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login")
        })
      }
    })
  }

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`} id="sidebar">
      <div className="logo">
        <img src="/assets/img/logo/logo.png" alt="logo" />
      </div>
      <div className="d-flex justify-content-between">
        <button 
          className="theme-btn mb-3 w-100 btn btn-primary me-2" 
          onClick={() => navigate("/ai-governance-compliance-step1")}
        >
          + New Governance
        </button>
        <a>
          <img src="/assets/img/search.png" alt="search" />
        </a>
      </div>

      {/* Governance History Section */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", color: "#666" }}>
          Governance History
        </div>
        <ul className="chat-list">
          {loading ? (
            <li style={{ padding: "10px", fontSize: "12px" }}>Loading governance reports...</li>
          ) : reports.length > 0 ? (
            <>
              {(showAllReports ? reports : reports.slice(0, 5)).map((report) => (
                <li
                  key={report.check_id}
                  onClick={() => handleReportClick(report.check_id)}
                  style={{ 
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "6px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <img 
                    src="/assets/img/chaticon.png" 
                    style={{ width: "16px", marginRight: "8px", display: "inline-block" }} 
                    alt="governance" 
                  />
                  <span style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", maxWidth: "180px" }}>
                    {report.scope?.compliance_scope || "Governance Report"}
                  </span>
                </li>
              ))}
              {reports.length > 5 && (
                <li style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => setShowAllReports(!showAllReports)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#3AC6BD",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {showAllReports ? "Show Less" : `View All (${reports.length})`}
                  </button>
                </li>
              )}
            </>
          ) : (
            <li style={{ padding: "10px", fontSize: "12px", color: "#999" }}>No governance reports yet</li>
          )}
        </ul>
      </div>

      <button className="btn logout-btn mt-4" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt me-2"></i> Log Out
      </button>
    </div>
  )
}

export default GovernanceSidebar
