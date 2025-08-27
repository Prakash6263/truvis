"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/AccountSidebar"
import TopBar from "../components/AccountTopBar"
import { getUserProfile, updateUserProfile } from "../api/auth"
import { getToken } from "../utils/auth"
import Swal from "sweetalert2"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

export default function AccountSettings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken()
        if (!token) {
          console.error("No token found")
          return
        }

        const { success, data } = await getUserProfile(token)
        if (success && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          })
          setPhone(data.user.phone || "")
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to fetch profile",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch profile data",
        })
      } finally {
        setProfileLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneChange = (value) => {
    setPhone(value)
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = getToken()
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please login again",
        })
        return
      }

      const { success, data } = await updateUserProfile(token, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || phone,
      })

      if (success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          timer: 2000,
          showConfirmButton: false,
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to update profile",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile",
      })
    } finally {
      setLoading(false)
    }
  }

  if (profileLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {!sidebarCollapsed && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            display: window.innerWidth <= 768 ? "block" : "none",
          }}
        />
      )}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    :root {\n      --bg-light: #ffffff;\n      --bg-dark: #121212;\n      --text-light: #000;\n      --text-dark: #fff;\n      --accent: #3AC6BD;\n      --sidebar-width: 300px;\n      --card-bg: #f9f9f9;\n      --border-color: #eee;\n    }\n    \n    body {\n     \n      margin: 0;\n      background-color: var(--bg-light);\n      color: var(--text-light);\n      transition: all 0.3s ease;\n    }\n    \n    .help-box {\n      background: #0d9488;\n      color: #fff;\n      border-radius: 12px;\n      padding: 1rem;\n      text-align: center;\n      margin: 1rem;\n    }\n    .help-box button {\n      background: #fff;\n      color: #0d9488;\n      border: none;\n      padding: 4px 15px;\n      border-radius: 20px;\n      font-size: 14px;\n    }\n    @media (max-width: 768px) {\n    .sidebar {\n        left: -300px;\n    }\n    .sidebar.collapsed {\n        left: -300px;\n    }\n  }\n  \n  /* Added desktop sidebar toggle styles */\n  @media (min-width: 769px) {\n    .sidebar.collapsed {\n        left: -300px;\n    }\n    .main2 {\n        margin-left: 0;\n        transition: margin-left 0.3s ease;\n    }\n    /* Hide overlay on desktop */\n    .sidebar-overlay {\n        display: none !important;\n    }\n  }\n  \n  .nav-tabs {\n      border-bottom: none;\n      margin-bottom: 20px;\n    }\n    .nav-tabs .nav-link {\n      border: none;\n      color: #999;\n      font-weight: 500;\n    }\n    .nav-tabs .nav-link.active {\n      color: #00bfa5;\n      border-bottom: 2px solid #00bfa5;\n    }\n    .react-tel-input .form-control {\n      width: 100%;\n      height: 38px;\n      padding: 6px 12px 6px 58px;\n      border: 1px solid #ced4da;\n      border-radius: 4px;\n    }\n    .react-tel-input .flag-dropdown {\n      border: 1px solid #ced4da;\n      border-right: none;\n      border-radius: 4px 0 0 4px;\n    }\n    .react-tel-input .selected-flag {\n      padding: 0 11px;\n    }\n  ",
        }}
      />
      <main className="main">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="main2">
          <TopBar onToggleSidebar={toggleSidebar} />
          <div className="middle">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="form-card">
                  <div className="row justify-content-center">
                    <div className="col-lg-12 mb-5">
                      <div className="d-flex justify-content-center">
                        <ul className="nav nav-tabs" style={{ maxWidth: "100%", overflow: "hidden" }}>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === "account" ? "active" : ""}`}
                              onClick={() => handleTabClick("account")}
                              style={{
                                background: "none",
                                border: "none",
                                whiteSpace: "nowrap",
                                padding: "8px 16px",
                              }}
                            >
                              Account
                            </button>
                          </li>
                          <li className="nav-item">
                            <button
                              className={`nav-link ${activeTab === "coin-management" ? "active" : ""}`}
                              onClick={() => handleTabClick("coin-management")}
                              style={{
                                background: "none",
                                border: "none",
                                whiteSpace: "nowrap",
                                padding: "8px 16px",
                              }}
                            >
                              Coin Management
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {activeTab === "account" && (
                      <div className="col-lg-6">
                        <h5 className="mb-3 text-center">Account Settings</h5>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={loading}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={loading}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <PhoneInput
                              country={"us"}
                              value={phone || formData.phone}
                              onChange={handlePhoneChange}
                              disabled={loading}
                              inputProps={{
                                name: "phone",
                                required: false,
                                autoFocus: false,
                              }}
                              containerStyle={{
                                width: "100%",
                              }}
                              inputStyle={{
                                width: "100%",
                                height: "38px",
                                fontSize: "14px",
                              }}
                              buttonStyle={{
                                border: "1px solid #ced4da",
                                borderRight: "none",
                              }}
                              dropdownStyle={{
                                zIndex: 9999,
                              }}
                            />
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-success" disabled={loading}>
                              {loading ? "Updating..." : "Update"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {activeTab === "coin-management" && (
                      <div className="col-lg-12">
                        <h5 className="mb-3 text-center">Transaction History</h5>
                        <div className="table-responsive bg-white p-2 rounded">
                          <table className="table align-middle mb-0">
                            <thead>
                              <tr>
                                <th>
                                  <input type="checkbox" />
                                </th>
                                <th>Transaction Id</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Card Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td>251456815</td>
                                <td>10-10-2024</td>
                                <td>2 coin</td>
                                <td>45465646XXXX</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td>251456815</td>
                                <td>10-10-2024</td>
                                <td>1 coin</td>
                                <td>445565646XXXX</td>
                              </tr>
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td>251456815</td>
                                <td>10-10-2024</td>
                                <td>5 coin</td>
                                <td>556565646XXXX</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <small className="text-dark">Items per page 1-3 of 200 items</small>
                          <nav>
                            <ul className="pagination pagination-sm mb-0 mt-0">
                              <li className="page-item disabled text-dark">
                                <a className="page-link" href="#">
                                  &lt;
                                </a>
                              </li>
                              <li className="page-item text-dark">
                                <a className="page-link" href="#">
                                  &gt;
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
