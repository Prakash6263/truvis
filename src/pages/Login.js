"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    navigate("/chat")
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
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-login">
                  Sign In
                </button>
              </form>
              <p className="signup-text">
                Don't have an account? <a href="/register">Sign up</a>
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
