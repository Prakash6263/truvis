"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/AccountSidebar"
import TopBar from "../components/AccountTopBar"
import { fetchPlans } from "../api/plans.js"
import { Link } from "react-router-dom"

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
      const result = await fetchPlans()
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

  // Premium (colorful/right) when isFree/isfree === true OR name === "Premium Plan"
  // Free (white/left) when isFree/isfree === false; fallbacks keep previous behavior
  const PREMIUM_NAME = "Premium Plan"

  const toNumber = (v) => {
    const n = Number(v)
    return Number.isNaN(n) ? null : n
  }

  const hasFlagTrue = (p) => p && (p.isFree === true || p.isfree === true || p.isFree === "true" || p.isfree === "true")

  const hasFlagFalse = (p) =>
    p && (p.isFree === false || p.isfree === false || p.isFree === "false" || p.isfree === "false")

  const isPremiumByName = (p) => typeof p?.name === "string" && /premium/i.test(p.name)
  const isFreeByName = (p) => typeof p?.name === "string" && /free/i.test(p.name)

  const priceOf = (p) => (p ? toNumber(p.price) : null)

  const pickPlans = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return { free: null, premium: null }

    // Candidates
    const premiumCandidates = arr.filter(
      (p) => hasFlagTrue(p) || isPremiumByName(p) || (priceOf(p) !== null && priceOf(p) > 0),
    )
    const freeCandidates = arr.filter(
      (p) => hasFlagFalse(p) || isFreeByName(p) || (priceOf(p) !== null && priceOf(p) === 0),
    )

    // Pick best premium (prefer explicit flag/name, then highest priced)
    let premium =
      premiumCandidates.find((p) => hasFlagTrue(p)) ||
      premiumCandidates.find((p) => isPremiumByName(p)) ||
      premiumCandidates.sort((a, b) => (priceOf(b) ?? -1) - (priceOf(a) ?? -1))[0] ||
      null

    // Pick best free (prefer explicit flag/name, then price==0)
    let free =
      freeCandidates.find((p) => hasFlagFalse(p)) ||
      freeCandidates.find((p) => isFreeByName(p)) ||
      freeCandidates.find((p) => priceOf(p) === 0) ||
      null

    // Ensure they are not the same object
    if (premium && free && premium === free) {
      // Try to find another distinct free
      const altFree = arr.find((p) => p !== premium && (hasFlagFalse(p) || isFreeByName(p) || priceOf(p) === 0)) || null
      if (altFree) free = altFree
      else {
        // Or another distinct premium
        const altPremium =
          arr.find((p) => p !== free && (hasFlagTrue(p) || isPremiumByName(p) || (priceOf(p) ?? 0) > 0)) || null
        if (altPremium) premium = altPremium
      }
    }

    return { free, premium }
  }

  const formatPrice = (value) => {
    const n = toNumber(value)
    if (n === null) return typeof value === "string" ? value : "$0"
    return `$${n}`
  }

  const normalizeFeatures = (plan, fallback) => {
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


  // Also tolerate name hints and ensure the two cards never share the same object.
  const paidPlan = Array.isArray(plans)
    ? plans.find(
        (p) => p?.isFree === true || p?.isfree === true || (typeof p?.name === "string" && /premium/i.test(p.name)),
      ) || null
    : null

  const freePlan = Array.isArray(plans)
    ? // prefer explicit false, or "free" in name, or price == 0, and make sure it's not the paid plan
      plans.find(
        (p) =>
          p !== paidPlan &&
          (p?.isFree === false ||
            p?.isfree === false ||
            (typeof p?.name === "string" && /free/i.test(p.name)) ||
            Number(p?.price) === 0),
      ) ||
      // final fallback: any other plan that isn't paidPlan
      plans.find((p) => p !== paidPlan) ||
      null
    : null



  return (
    <>
      {/* Preloader */}
      {loading && (
        <div className="preloader">
          <div className="loader-ripple">
            <div />
            <div />
          </div>
        </div>
      )}

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
      border-radius: 20px; padding: 40px 30px; background: #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.3s;
    }
    .pricing-card:hover { transform: translateY(-5px); }
    .pricing-card.active { background: #0fd1b0; color: #fff; position: relative; }
    .pricing-card.active .btn { background: #fff; color: #0fd1b0; font-weight: 600; }
    .pricing-card h2 { font-size: 42px; font-weight: bold; margin-bottom: 0; }
    .pricing-card .price-text { font-size: 16px; color: #777; margin-bottom: 20px; }
    .pricing-card ul { list-style: none; padding: 0; margin: 25px 0; text-align: left; }
    .pricing-card ul li { margin-bottom: 12px; font-size: 15px; display: flex; align-items: center; }
    .pricing-card ul li i { margin-right: 10px; }
    .pricing-card.active ul li { color: #fff; }
    .badge-choice {
      position: absolute; top: -20px; right: -20px; background: #000; color: #fff;
      font-size: 13px; padding: 6px 12px; border-radius: 20px;
    }
          `,
        }}
      />
      <main className="main">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        {/* Main Area */}
        <div className="main2">
          <TopBar />
          <div className="middle">
            <section className="pricing-section">
              <div className="container">
                {/* Heading */}
                <h2 className="fw-bold">
                  Start today, with free or
                  <br />
                  premium plan, you choose
                </h2>
                <p className="text-muted mb-5">
                  With lots of unique and useful features, you can easily manage
                  <br /> your wallet easily without any problem.
                </p>

                {loading && <div style={{ padding: 16, textAlign: "center" }}>Loading plans...</div>}
                {!loading && error && <div style={{ padding: 16, textAlign: "center", color: "crimson" }}>{error}</div>}
                {!loading && !error && (
                  <div className="row justify-content-center g-4">
                    {/* Basic Plan */}
                    <div className="col-md-4">
                      <div className="pricing-card h-100">
                        <h2 className="">{formatPrice(freePlan?.price ?? 0)}</h2>
                        <p className="price-text">Per month</p>
                        <p className="text-muted">
                          {freePlan?.description ||
                            "Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured."}
                        </p>
                        <ul>
                          {normalizeFeatures(freePlan).map((f, i) => (
                            <li key={i}>
                              <i className={`fa ${f.available ? "fa-check text-success" : "fa-times text-danger"}`} />{" "}
                              {f.label}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="/dashboard"
                          className="btn btn-outline-dark rounded-pill px-4"
                        >
                          Join for free
                        </Link>
                      </div>
                    </div>
                    {/* Premium Plan */}
                    <div className="col-md-4">
                      <div className="pricing-card active h-100">
                        <span className="badge-choice mb-2">{paidPlan?.name || "Premium Plan"}</span>
                        <h2 className="text-white">{formatPrice(paidPlan?.price ?? 49)}</h2>
                        <p className="price-text text-white">Per month</p>
                        <p>
                          {paidPlan?.description ||
                            "Oven even feet time have an oat. Relation so in confined smallest children unpacked delicate. Why sir end believe."}
                        </p>
                        <ul>
                          {normalizeFeatures(paidPlan).map((f, i) => (
                            <li key={i}>
                              <i className={`fa ${f.available ? "fa-check" : "fa-times"}`} /> {f.label}
                            </li>
                          ))}
                        </ul>
                        <a
                          href={
                            paidPlan
                              ? `/buy-coin?planId=${encodeURIComponent(paidPlan._id || paidPlan.id || "")}`
                              : "/buy-coin"
                          }
                          className="btn rounded-pill px-4"
                        >
                          Get the premium
                        </a>
                      </div>
                    </div>
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
