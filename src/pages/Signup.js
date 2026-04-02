"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"
import { Link } from "react-router-dom"
import { registerUser } from "../api/auth"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Signup form submitted:", formData)
      const { success, data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      console.log("[v0] API Response:", { success, data })

      if (success) {
        await Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Your account has been created successfully. Please log in to continue.",
          confirmButtonText: "Go to Login",
        })

        // Redirect to login page, not dashboard
        navigate("/login")
      } else {
        // Show error message
        await Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.message || "Something went wrong. Please try again.",
          confirmButtonText: "OK",
        })
      }
    } catch (error) {
      console.error("[v0] Signup error:", error)
      await Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to server. Please check your connection and try again.",
        confirmButtonText: "OK",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Preloader />
      <Header />

      <main className="main">
        {/* Header Section */}
        <div className="header-bg">
          <h2 className="text-white">Welcome!</h2>
          <p className="text-white">Use these awesome forms to login or create a free account to your project</p>
        </div>

        {/* Signup Box */}
        <div className="signup-box mb-5">
          <img src="assets/img/logo/logo.png" alt="Logo" />
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  style={{ paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#3AC6BD",
                    fontSize: "16px",
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            <div className="mb-3 form-check text-start">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-signup" disabled={isLoading}>
              {isLoading ? "SIGNING UP..." : "SIGN UP"}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </main>

      <Footer />
      <ScrollTop />
    </>
  )
}

export default Signup
