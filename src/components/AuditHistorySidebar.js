import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { logout } from "../utils/auth"
import { getAuditHistory } from "../api/audit"

const AuditHistorySidebar = ({
  isCollapsed,
  onToggle,
}) => {
  const navigate = useNavigate()
  const [audits, setAudits] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAllAudits, setShowAllAudits] = useState(false)

  useEffect(() => {
    fetchAuditHistory()
  }, [])

  const fetchAuditHistory = async () => {
    try {
      setLoading(true)
      const response = await getAuditHistory()
      setAudits(response.audits || [])
      console.log("[v0] Audit history fetched:", response.audits)
    } catch (error) {
      console.error("[v0] Failed to fetch audit history:", error)
      setAudits([])
    } finally {
      setLoading(false)
    }
  }

  const handleAuditClick = (auditId) => {
    // Store selected audit ID and navigate to audit detail view
    localStorage.setItem("selectedAuditId", auditId)
    navigate(`/audit-detail/${auditId}`)
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
          onClick={() => navigate("/audit-compliance")}
        >
          + New Audit
        </button>
        <a>
          <img src="/assets/img/search.png" alt="search" />
        </a>
      </div>

      {/* Audit History Section */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px", color: "#666" }}>
          Audit History
        </div>
        <ul className="chat-list">
          {loading ? (
            <li style={{ padding: "10px", fontSize: "12px" }}>Loading audits...</li>
          ) : audits.length > 0 ? (
            <>
              {(showAllAudits ? audits : audits.slice(0, 5)).map((audit) => (
                <li
                  key={audit.audit_id}
                  onClick={() => handleAuditClick(audit.audit_id)}
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
                    alt="audit" 
                  />
                  <span style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block", maxWidth: "180px" }}>
                    {audit.scope?.audit_type || "Audit"}
                  </span>
                </li>
              ))}
              {audits.length > 5 && (
                <li style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => setShowAllAudits(!showAllAudits)}
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
                    {showAllAudits ? "Show Less" : `View All (${audits.length})`}
                  </button>
                </li>
              )}
            </>
          ) : (
            <li style={{ padding: "10px", fontSize: "12px", color: "#999" }}>No audits yet</li>
          )}
        </ul>
      </div>

      <button className="btn logout-btn mt-4" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt me-2"></i> Log Out
      </button>
    </div>
  )
}

export default AuditHistorySidebar
