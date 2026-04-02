"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/AccountSidebar"
import TopBar from "../components/AccountTopBar"
import { fetchPlans } from "../api/plans.js"
import { Link } from "react-router-dom"
import { CirclesWithBar } from "react-loader-spinner"

export default function PricingPlans() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [plans, setPlans] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed((v) => !v)
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError("")
      // console.log("[v0] Fetching plans...")
      const result = await fetchPlans()
      // console.log("[v0] Plans fetch result:", result)
      if (!mounted) return
      if (result.success) {
        setPlans(result.plans || [])
        setError("")
      } else {
        setError(result.message || "Failed to load plans")
      }
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [])

  const toNumber = (v) => {
    const n = Number(v)
    return Number.isNaN(n) ? null : n
  }

  const hasFlagTrue = (p) => p && (p.isFree === true || p.isfree === true || p.isFree === "true" || p.isfree === "true")

  const hasFlagFalse = (p) =>
    p && (p.isFree === false || p.isfree === false || p.isFree === "false" || p.isfree === "false")

  const isPremiumByName = (p) => typeof p?.name === "string" && /premium|pro|max|mini/i.test(p.name)
  const isFreeByName = (p) => typeof p?.name === "string" && /free|basic|starter/i.test(p.name)

  const priceOf = (p) => (p ? toNumber(p.price) : null)

  const normalizeFeatures = (plan, fallback = []) => {
    const src = plan && Array.isArray(plan.features) ? plan.features : null
    if (!src) return fallback

    // Accept array of strings or array of objects
    return src.map((item) => {
      if (typeof item === "string") {
        return { label: item, available: true }
      }
      if (item && typeof item === "object") {
        // Try common keys
        const label =
          item.label || item.name || item.title || item.feature || (typeof item.text === "string" ? item.text : "")
        const available =
          typeof item.available === "boolean"
            ? item.available
            : typeof item.enabled === "boolean"
              ? item.enabled
              : typeof item.isAvailable === "boolean"
                ? item.isAvailable
                : typeof item.active === "boolean"
                  ? item.active
                  : true
        return { label, available }
      }
      return { label: String(item), available: true }
    })
  }

  const allPlans = Array.isArray(plans) ? plans : []

  // console.log("[v0] Displaying all plans:", allPlans)

  const formatPrice = (value) => {
    const n = toNumber(value)
    if (n === null) return typeof value === "string" ? value : "$0"
    return `$${n}`
  }

  return (
    <>
      {loading && (
        <div
          className="preloader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CirclesWithBar
            height="100"
            width="100"
            color="#3AC6BD"
            outerCircleColor="#3AC6BD"
            innerCircleColor="#3AC6BD"
            barColor="#3AC6BD"
            ariaLabel="circles-with-bar-loading"
            visible={true}
          />
          <p style={{ marginTop: "20px", fontSize: "16px", color: "#333", fontWeight: "500" }}>
            Loading pricing plans...
          </p>
        </div>
      )}

      {!sidebarCollapsed && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
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

    .chat-card {
      background: #1ec9b7;
      border-radius: 20px;
      padding: 25px 20px;
      width: 100%;
      color: #fff;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .chat-card::before {
      content: "";
      position: absolute;
      right: -50px;
      bottom: -50px;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    .chat-card::after {
      content: "";
      position: absolute;
      right: -100px;
      bottom: -100px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }
    .chat-icon {
      background: #fff;
      color: #1ec9b7;
      font-size: 22px;
      padding: 12px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
    }
    .chat-card h6 { font-weight: 700; font-size: 18px; }
    .chat-card p { margin: 5px 0 20px; font-size: 14px; color: #eafaf8; }
    .chat-btn {
      background: #fff; color: #000; font-weight: 600; border-radius: 12px;
      padding: 12px 15px; display: block; text-align: center; text-decoration: none; transition: 0.3s;
    }
    .chat-btn:hover { background: #f1f1f1; }

    @media (max-width: 768px) {
      .sidebar { left: -300px; }
    }

    .pricing-section { padding: 60px 20px; text-align: center; }
    
    .pricing-card {
      border-radius: 16px;
      padding: 40px 30px;
      background: #fff;
      box-shadow: 0 2px 20px rgba(0,0,0,0.06);
      transition: all 0.3s ease;
      border: 2px solid transparent;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .pricing-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.12);
      border-color: rgba(58, 198, 189, 0.3);
    }
    
    .pricing-card.featured {
      background: linear-gradient(135deg, #3AC6BD 0%, #2da89f 100%);
      color: #fff;
      position: relative;
      border-color: #3AC6BD;
    }
    .pricing-card.featured .btn {
      background: #fff;
      color: #3AC6BD;
      font-weight: 600;
    }
    .pricing-card.featured .btn:hover {
      background: #f8f8f8;
    }
    
    .plan-badge {
      position: absolute;
      top: -12px;
      right: 20px;
      background: #000;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .plan-name {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .pricing-card h2 {
      font-size: 48px;
      font-weight: bold;
      margin: 16px 0 8px 0;
      line-height: 1;
    }
    .pricing-card .price-text {
      font-size: 15px;
      color: #777;
      margin-bottom: 24px;
      font-weight: 500;
    }
    .pricing-card.featured .price-text {
      color: rgba(255,255,255,0.9);
    }
    
    .plan-description {
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 24px;
      flex-grow: 1;
      color: #666;
    }
    .pricing-card.featured .plan-description {
      color: rgba(255,255,255,0.95);
    }
    
    .pricing-card ul {
      list-style: none;
      padding: 0;
      margin: 25px 0;
      text-align: left;
    }
    .pricing-card ul li {
      margin-bottom: 14px;
      font-size: 15px;
      display: flex;
      align-items: flex-start;
      line-height: 1.5;
    }
    .pricing-card ul li i {
      margin-right: 12px;
      margin-top: 2px;
      font-size: 16px;
    }
    .pricing-card.featured ul li {
      color: #fff;
    }
          `,
        }}
      />
      <main className="main">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="main2">
          <TopBar />
          <div className="middle">
            <section className="pricing-section">
              <div className="container">
                <h2 className="fw-bold">
                  Start today, with free or
                  <br />
                  premium plan, you choose
                </h2>
                <p className="text-muted mb-5">
                  With lots of unique and useful features, you can easily manage
                  <br /> your wallet easily without any problem.
                </p>

                {!loading && error && <div style={{ padding: 16, textAlign: "center", color: "crimson" }}>{error}</div>}

                {!loading && !error && (
                  <div className="row justify-content-center g-4">
                    {allPlans.length === 0 ? (
                      <div className="col-12">
                        <p className="text-muted">No pricing plans available at the moment.</p>
                      </div>
                    ) : (
                      allPlans.map((plan, index) => {
                        const isFeatured =
                          plan.isFree === false || plan.isfree === false || (plan.price && Number(plan.price) > 0)
                        const planId = plan.id || plan._id || `plan-${index}`

                        return (
                          <div key={planId} className="col-md-6 col-lg-4">
                            <div className={`pricing-card ${isFeatured ? "featured" : ""}`}>
                              {isFeatured && <span className="plan-badge">Popular</span>}

                              <div className="plan-name">{plan.name || "Plan"}</div>

                              <h2>{formatPrice(plan.price ?? 0)}</h2>
                              <p className="price-text">Per month</p>

                              <p className="plan-description">
                                {plan.description ||
                                  "Get started with our flexible pricing plan tailored to your needs."}
                              </p>

                              <ul>
                                {normalizeFeatures(plan, [{ label: "Basic features included", available: true }]).map(
                                  (f, i) => (
                                    <li key={i}>
                                      <i
                                        className={`fa ${f.available ? "fa-check text-success" : "fa-times text-danger"}`}
                                      />
                                      <span>{f.label}</span>
                                    </li>
                                  ),
                                )}
                              </ul>

                              {isFeatured ? (
                                <a
                                  // href={`/buy-coin?planId=${encodeURIComponent(planId)}`}
                                   href={`/wallet?planId=${encodeURIComponent(planId)}`}
                                  className="btn rounded-pill px-4"
                                  style={{ marginTop: "auto" }}
                                >
                                  Get {plan.name || "Premium"}
                                </a>
                              ) : (
                                <Link
                                  to="/dashboard"
                                  className="btn btn-outline-dark rounded-pill px-4"
                                  style={{ marginTop: "auto" }}
                                >
                                  Get Started
                                </Link>
                              )}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
