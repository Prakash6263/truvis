
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/AccountSidebar"
import TopBar from "../components/AccountTopBar"
import { getUserProfile, updateUserProfile } from "../api/auth"
import Swal from "sweetalert2"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { fetchMyPurchases } from "../api/plans"

export default function AccountSettings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("account")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)

  const [purchases, setPurchases] = useState([])
  const [purchasesLoading, setPurchasesLoading] = useState(false)
  const [purchasesError, setPurchasesError] = useState("")

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleBackToHome = () => {
    navigate("/")
  }

  useEffect(() => {
    if (activeTab !== "coin-management") return
    let cancelled = false

    async function loadPurchases() {
      setPurchasesLoading(true)
      setPurchasesError("")
      try {
        const { success, history, message } = await fetchMyPurchases()
        if (cancelled) return
        if (success) {
          setPurchases(Array.isArray(history) ? history : [])
        } else {
          setPurchases([])
          setPurchasesError(message || "Failed to fetch purchases")
        }
      } catch (err) {
        if (cancelled) return
        setPurchasesError(err?.message || "Network error")
      } finally {
        if (!cancelled) setPurchasesLoading(false)
      }
    }

    loadPurchases()
    return () => {
      cancelled = true
    }
  }, [activeTab])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { success, data } = await getUserProfile()
        if (success && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          })
          setPhone(data.user.phone || "")
        } else {
          if (data.message === "Invalid or expired token") {
            window.location.href = "/login"
            return
          }
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
    setSidebarCollapsed((v) => !v)
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
      const { success, data } = await updateUserProfile({
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
        if (data.message === "Invalid or expired token") {
          window.location.href = "/login"
          return
        }
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
            // position: "fixed",
            // top: 0,
            // left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
            // Only show overlay on mobile/tablet
            display: typeof window !== "undefined" && window.innerWidth <= 768 ? "block" : "none",
          }}
        />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
    :root {
      --bg-light: #ffffff;
      --bg-dark: #121212;
      --text-light: #000;
      --text-dark: #fff;
      --accent: #3AC6BD;
      --sidebar-width: 300px;
      --card-bg: #f9f9f9;
      --border-color: #eee;
    }

    body {
      margin: 0;
      background-color: var(--bg-light);
      color: var(--text-light);
      transition: all 0.3s ease;
    }

    .help-box {
      background: #0d9488;
      color: #fff;
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      margin: 1rem;
    }
    .help-box button {
      background: #fff;
      color: #0d9488;
      border: none;
      padding: 4px 15px;
      border-radius: 20px;
      font-size: 14px;
    }

    /* Mobile & tablet */
    @media (max-width: 768px) {
      .sidebar { left: -300px; }
      .sidebar.collapsed { left: -300px; }
      /* On small screens, content should start at the left edge */
      .main2 { margin-left: 0; }
    }

    /* Desktop */
    @media (min-width: 769px) {
      .sidebar.collapsed { left: -300px; }

      /* Default: when sidebar is visible, push content by sidebar width */
      .main2 {
        margin-left: var(--sidebar-width);
        transition: margin-left 0.3s ease;
      }

      /* When the Sidebar has 'collapsed' class, remove the margin */
      .sidebar.collapsed + .main2 {
        margin-left: 0;
      }

      /* Hide overlay on desktop */
      .sidebar-overlay {
        display: none !important;
      }
    }

    .nav-tabs {
      border-bottom: none;
      margin-bottom: 20px;
    }
    .nav-tabs .nav-link {
      border: none;
      color: #999;
      font-weight: 500;
    }
    .nav-tabs .nav-link.active {
      color: #00bfa5;
      border-bottom: 2px solid #00bfa5;
    }

    .react-tel-input .form-control {
      width: 100%;
      height: 38px;
      padding: 6px 12px 6px 58px;
      border: 1px solid #ced4da;
      border-radius: 4px;
    }
    .react-tel-input .flag-dropdown {
      border: 1px solid #ced4da;
      border-right: none;
      border-radius: 4px 0 0 4px;
    }
    .react-tel-input .selected-flag {
      padding: 0 11px;
    }

    /* Keep Date column on one line so it doesn't wrap awkwardly */
    .table td:nth-child(2), .table th:nth-child(2) {
      white-space: nowrap;
    }
          `,
        }}
      />

      <main className="main">
        {/* Ensure Sidebar root element has className 'sidebar' inside its component for the sibling selector to work */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="main2">
          <TopBar onToggleSidebar={toggleSidebar} />
          <div className="middle">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="form-card">
                  <div className="row justify-content-center mb-4">
                    <div className="col-lg-12 text-center">
                      <button
                        className="btn btn-primary"
                        onClick={handleBackToHome}
                        title="Back to Home"
                        style={{
                          backgroundColor: "#3AC6BD",
                          borderColor: "#3AC6BD",
                          color: "white",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                      >
                        <i className="fas fa-arrow-left" style={{ marginRight: "8px" }} />
                        Back to Home
                      </button>
                    </div>
                  </div>

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
                              disabled={true}
                              readOnly
                              aria-readonly="true"
                              tabIndex={-1}
                              onFocus={(e) => e.target.blur()}
                              autoComplete="off"
                              style={{
                                backgroundColor: "#f5f5f5",
                                cursor: "not-allowed",
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              disabled={true}
                              readOnly
                              aria-readonly="true"
                              tabIndex={-1}
                              onFocus={(e) => e.target.blur()}
                              autoComplete="off"
                              style={{
                                backgroundColor: "#f5f5f5",
                                cursor: "not-allowed",
                                pointerEvents: "none",
                                userSelect: "none",
                              }}
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
                                {/* <th>
                                  <input type="checkbox" />
                                </th> */}
                                {/* <th>Transaction Id</th> */}
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Card Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              {purchasesLoading ? (
                                <tr>
                                  <td colSpan={5} className="text-center">
                                    <div className="spinner-border text-primary" role="status" />
                                  </td>
                                </tr>
                              ) : purchasesError ? (
                                <tr>
                                  <td colSpan={5} className="text-danger text-center">
                                    {purchasesError}
                                  </td>
                                </tr>
                              ) : purchases.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="text-muted text-center">
                                    No purchases found.
                                  </td>
                                </tr>
                              ) : (
                                purchases.map((p) => {
                                  const dateStr = new Date(p?.purchasedAt || p?.createdAt).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                  return (
                                    <tr key={p._id}>
                                      {/* <td>
                                        <input type="checkbox" />
                                      </td> */}
                                      {/* <td>{p?.stripePaymentId || p?._id}</td> */}
                                      <td>{dateStr}</td>
                                      <td>{p?.amount ?? "-"}</td>
                                      <td>{p?.card ?? "-"}</td>
                                    </tr>
                                  )
                                })
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* simple pagination footer */}
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <small className="text-dark">
                            Showing {purchases.length > 0 ? `1-${purchases.length}` : "0"} of {purchases.length} items
                          </small>
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
