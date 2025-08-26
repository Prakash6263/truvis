"use client"

const TopBar = ({ onSidebarToggle, onModeToggle }) => {
  return (
    <div className="topbar mb-3">
      <div>
        <button className="btn btn-toggle-sidebar w-auto" onClick={onSidebarToggle}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className="right w-auto">
        <button className="coin theme-btn">50 Coin</button>
        <i className="fas fa-bell icon"></i>
        <img src="assets/img/Avatar.png" className="rounded-circle" alt="User" />
        {/* <button className="btn btn-sm btn-outline-dark" onClick={onModeToggle}>
           🌓
        </button> */}
      </div>
    </div>
  )
}

export default TopBar
