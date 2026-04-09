"use client"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { logout } from "../utils/auth"

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
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
            inset:null,
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
          <li onClick={() => handleNavigate("/dashboard")} style={{ cursor: "pointer" }}>
            <img src="assets/icons/icons/default.png" style={{ width: 20, marginRight: 10 }}/> Dashboard
          </li>
          <li onClick={() => handleNavigate("/risk-management")} style={{ cursor: "pointer" }}>
            <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> Risk Management
          </li>
          <li onClick={() => handleNavigate("/audit-compliance-step1")} style={{ cursor: "pointer" }}>
            <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> Audit 
          </li>
          <li onClick={() => handleNavigate("/ai-governance-compliance-step1")} style={{ cursor: "pointer" }}>
            <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> AI Governance 
          </li>
          <li onClick={() => handleNavigate("/plans")} style={{ cursor: "pointer" }}>
            <img src="assets/img/chaticon.png" style={{ width: 20, marginRight: 10 }} /> Plans
          </li>
        </ul>

        <button className="btn logout-btn mt-4" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i> Log Out
        </button>
      </div>
    </>
  )
}




