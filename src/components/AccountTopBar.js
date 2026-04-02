"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserProfile, getWalletBalance } from "../api/auth"
import { isAuthenticated } from "../utils/auth"

export default function TopBar({ onToggleSidebar, refreshBalance }) {
  const [userData, setUserData] = useState(null)
  const [coinBalance, setCoinBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchWalletBalance = async () => {
    try {
      const { success, data } = await getWalletBalance()
      if (success) {
        setCoinBalance(data.coins)
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
    }
  }

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

        await fetchWalletBalance()
      } catch (error) {
        console.error("Error fetching user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  useEffect(() => {
    if (refreshBalance) {
      fetchWalletBalance()
    }
  }, [refreshBalance])

  const handleBackToHome = () => {
    navigate("/plans")
  }

  return (
    <div className="topbar mb-3">
      <div>
        {/* <button
          className="btn btn-primary me-2"
          onClick={handleBackToHome}
          title="Back to Home"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: "5px" }} />
          Back
        </button> */}
        <button className="btn btn-toggle-sidebar w-auto" id="sidebarToggle" onClick={onToggleSidebar}>
          <i className="fas fa-bars" />
        </button>
      </div>
      <div className="right w-auto">
        <button className="coin theme-btn" onClick={handleBackToHome}>
          {loading ? "Loading..." : `${coinBalance} Coin`}
        </button>
        <a href="#">
          <span className="fw-semibold">
            <i className="fas fa-user icon" />
            {loading ? "Loading..." : userData?.name || "Username"}
          </span>
        </a>
        {/* <a href="#">
          <i className="fas fa-cog icon" />
        </a> */}
        <a href="#">
          <i className="fas fa-bell icon" />
        </a>
      </div>
    </div>
  )
}
