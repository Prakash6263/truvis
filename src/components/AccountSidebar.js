"use client"
import { useNavigate } from "react-router-dom"
export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()

  const handleNavigateHome = () => {
    navigate("/dashboard")
  }
  return (
    <>
      {!collapsed && (
        <div
          className="sidebar-overlay"
          onClick={onToggle}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            display: window.innerWidth <= 768 ? "block" : "none",
          }}
        />
      )}

      <div className={`sidebar ${collapsed ? "collapsed" : ""}`} id="sidebar">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
          <div className="logo">
            <img src="assets/img/logo/logo.png" alt="logo" />
          </div>
          <button
            onClick={onToggle}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#3ac6bd",
              cursor: "pointer",
              display: window.innerWidth <= 768 ? "block" : "none",
            }}
          >
            ×
          </button>
        </div>

        <ul className="chat-list">
          <li onClick={handleNavigateHome} style={{ cursor: "pointer" }}>
            <img src="assets/icons/icons/default.png" style={{ width: 20, marginRight: 10 }}/> Dashboard
          </li>
          <li>
            <img src="assets/icons/icons/chart.png" style={{ width: 20, marginRight: 10 }} /> Accountancy Audit{" "}
          </li>
          <li>
            <img src="assets/icons/icons/card.png" style={{ width: 20, marginRight: 10 }} /> Monetization
          </li>
          <li>
            <img src="assets/icons/icons/repair.png" style={{ width: 20, marginRight: 10 }} /> Ai Report
          </li>
        </ul>
        <h6 className="mb-2">Risk Management</h6>
        <ul className="chat-list">
          <li>
            <img src="assets/icons/icons/person.png" style={{ width: 20, marginRight: 10 }} /> Attack Simulation Mode
          </li>
          <li className="active">
            <i className="fa fa-file" style={{ color: "#3ac6bd", marginRight: 10 }} /> Ai Risk Compliances
          </li>
        </ul>
      </div>
    </>
  )
}
