"use client"

export default function TopBar({ onToggleSidebar }) {
  return (
    <div className="topbar mb-3">
      <div>
        <button className="btn btn-toggle-sidebar w-auto" id="sidebarToggle" onClick={onToggleSidebar}>
          <i className="fas fa-bars" />
        </button>
      </div>
      <div className="right w-auto">
        <button className="coin theme-btn">50 Coin</button>
        <a href="#">
          {" "}
          <span className="fw-semibold">
            <i className="fas fa-user icon" /> Username
          </span>
        </a>
        <a href="#">
          <i className="fas fa-cog icon" />
        </a>
        <a href="#">
          <i className="fas fa-bell icon" />
        </a>
      </div>
    </div>
  )
}
