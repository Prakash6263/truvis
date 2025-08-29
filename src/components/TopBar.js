"use client"
import { useNavigate } from "react-router-dom"
const TopBar = ({ onSidebarToggle, onModeToggle }) => {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account-settings"); // put your page route here
  };

    const handleBackToHome = () => {
    navigate("/buy-coin")
  }

  return (
    <div className="topbar mb-3">
      <div>
        <button className="btn btn-toggle-sidebar w-auto" onClick={onSidebarToggle}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className="right w-auto">
        <button className="coin theme-btn" onClick={handleBackToHome}>50 Coin</button>
        <i className="fas fa-bell icon"></i>
        <img src="assets/img/Avatar.png" className="rounded-circle" alt="User" onClick={handleClick}/>
        {/* <button className="btn btn-sm btn-outline-dark" onClick={onModeToggle}>
           🌓
        </button> */}
      </div>
    </div>
  )
}

export default TopBar
