"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"
import Swal from "sweetalert2"
import { loginUser } from "../api/auth"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      const { success, data } = await loginUser({
        email: formData.email,
        password: formData.password,
      })

      if (success && data.status === "success") {
        // Store token in localStorage
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${data.user.name}!`,
          confirmButtonColor: "#3AC6BD",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/chat")
        })
      } else {
        throw new Error(data.message || "Login failed")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password. Please try again.",
        confirmButtonColor: "#3AC6BD",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Preloader />
      <Header />

      <main className="main">
        <div className="login-container mb-3">
          {/* Form Side */}
          <div className="form-side">
            <div className="form-box">
              <h2 className="mb-3">Welcome Back</h2>
              <p className="text-muted mb-4">Enter your email and password to sign in</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
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
                <div className="mb-3">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-login" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <p className="signup-text">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>

          {/* Graphic Side */}
          <div className="graphic-side">
            <img src="assets/img/login.png" alt="Truvis Logo" />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  )
}

export default Login
