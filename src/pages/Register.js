"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Preloader from "../components/Preloader"
import ScrollTop from "../components/ScrollTop"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      alert("Please agree to the Terms of Service")
      return
    }
    // Handle registration logic here
    navigate("/login")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <Preloader />
      <Header />

      <main className="main">
        {/* Breadcrumb */}
        <div className="site-breadcrumb" style={{ background: "url(assets/img/breadcrumb/01.jpg)" }}>
          <div className="container">
            <h2 className="breadcrumb-title">Register</h2>
            <ul className="breadcrumb-menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="active">Register</li>
            </ul>
          </div>
        </div>

        {/* Register Area */}
        <div className="auth-area py-100">
          <div className="container">
            <div className="col-md-5 mx-auto">
              <div className="auth-form">
                <div className="auth-header">
                  <img src="assets/img/logo/logo.png" alt="" />
                  <p>Create your free Truvis account</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="form-icon">
                      <i className="far fa-user-tie"></i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-icon">
                      <i className="far fa-envelope"></i>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-icon">
                      <i className="far fa-key"></i>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="form-control"
                        placeholder="Your Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="password-view" onClick={togglePasswordVisibility}>
                        <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                      </span>
                    </div>
                  </div>
                  <div className="auth-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="agree"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="agree">
                        I agree with the{" "}
                        <a href="/terms" className="auth-group-link">
                          Terms Of Service.
                        </a>
                      </label>
                    </div>
                  </div>
                  <div className="auth-btn">
                    <button type="submit" className="theme-btn">
                      <span className="far fa-paper-plane"></span> Register
                    </button>
                  </div>
                </form>
                <div className="auth-bottom">
                  <div className="auth-social">
                    <p>Continue with social media</p>
                    <div className="auth-social-list">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-google"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-x-twitter"></i>
                      </a>
                    </div>
                  </div>
                  <p className="auth-bottom-text">
                    Already have an account? <a href="/login">Login.</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  )
}

export default Register
