"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getWalletBalance } from "../api/auth"
import { isAuthenticated } from "../utils/auth"

const TopBar = ({ onSidebarToggle, onModeToggle }) => {
  const [coinBalance, setCoinBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchWalletBalance = async () => {
    if (!isAuthenticated()) {
      setLoading(false)
      return
    }

    try {
      const { success, data } = await getWalletBalance()

      if (success) {
        setCoinBalance(data.coins || 0)
      } else {
        if (data.message === "Invalid or expired token") {
          navigate("/login")
        }
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWalletBalance()

    const handleRefresh = () => {
      fetchWalletBalance()
    }

    window.addEventListener("refreshWalletBalance", handleRefresh)

    return () => {
      window.removeEventListener("refreshWalletBalance", handleRefresh)
    }
  }, [navigate])

  const handleClick = () => {
    navigate("/account-settings")
  }

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
        <button className="coin theme-btn" onClick={handleBackToHome}>
          {loading ? "Loading..." : `${coinBalance} Coin`}
        </button>
        <i className="fas fa-bell icon"></i>
        <img src="assets/img/Avatar.png" className="rounded-circle" alt="User" onClick={handleClick} />
      </div>
    </div>
  )
}

export default TopBar
