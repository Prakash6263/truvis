"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../api/auth"
import { isAuthenticated } from "../utils/auth"
const TopBar = ({ onSidebarToggle, onModeToggle }) => {

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated()) {
        setLoading(false)
        return
      }

      try {
        const { success, data } = await getUserProfile()

        if (success) {
          setUserData(data.user)
        } else {
          if (data.message === "Invalid or expired token") {
            navigate("/login")
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])




  const handleClick = () => {
    navigate("/account-settings"); // put your page route here
  };

    const handleBackToHome = () => {
    navigate("/plans")
  }

  return (
    <div className="topbar mb-3">
      <div>
        <button className="btn btn-toggle-sidebar w-auto" onClick={onSidebarToggle}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <div className="right w-auto">
        <button className="coin theme-btn" onClick={handleBackToHome}>{loading ? "Loading..." : `${userData?.credits || 0} Coin`}</button>
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
