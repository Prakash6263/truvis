"use client"

import { useState } from "react"

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen)
  }

  return (
    <header className="header">
      <div className="main-navigation">
        <nav className="navbar navbar-expand-lg">
          <div className="container position-relative">
            <a className="navbar-brand" href="/">
              <img src="assets/img/logo/logo.png" alt="logo" style={{ width: "100px" }} />
            </a>
            <div className="mobile-menu-right">
              <div className="mobile-menu-btn">
                <button type="button" className="nav-right-link search-box-outer">
                  <i className="far fa-search"></i>
                </button>
              </div>
              <button className="navbar-toggler" type="button" onClick={toggleOffcanvas} aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={`offcanvas offcanvas-start ${isOffcanvasOpen ? "show" : ""}`} tabIndex="-1">
              <div className="offcanvas-header">
                <a href="/" className="offcanvas-brand">
                  <img src="assets/img/logo/logo.png" alt="" style={{ width: "100px" }} />
                </a>
                <button type="button" className="btn-close" onClick={toggleOffcanvas} aria-label="Close">
                  <i className="far fa-xmark"></i>
                </button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-center flex-grow-1">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/ai-compliance">
                      AI Compliance
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/audit-compliance">
                      Audit Compliance
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/terms">
                      Terms & Condition
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/privacy">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/disclaimer">
                      Disclaimer
                    </a>
                  </li>
                </ul>
                <div className="nav-right">
                  <div className="nav-btn">
                    <a href="/login" className="btn btn-default">
                      Login
                    </a>
                  </div>
                  <div className="nav-btn">
                    <a href="/signup" className="theme-btn">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
