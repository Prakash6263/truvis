"use client"

import { useEffect, useMemo, useState } from "react"
import Sidebar from "../components/AccountSidebar"
import TopBar from "../components/AccountTopBar"
import { useNavigate } from "react-router-dom"
import { apiCreateCustomer, apiSaveCard, apiAttachCard, hasSavedCardLocal, markSavedCardLocal } from "../api/payments"
import { buyPlan, fetchPlanById } from "../api/plans"

// Stripe
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

function SaveCardForm({ onSaved }) {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSaveCard = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setMessage("")
    setLoading(true)

    try {
      await apiCreateCustomer()
      const { clientSecret } = await apiSaveCard()
      if (!clientSecret) throw new Error("Missing clientSecret from save-card")

      const card = elements.getElement(CardElement)
      if (!card) throw new Error("CardElement not mounted")

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card,
          billing_details: { name: name || "Unknown" },
        },
      })
      if (result.error) throw new Error(result.error.message || "Failed to confirm card")

      const paymentMethodId = result.setupIntent?.payment_method
      if (!paymentMethodId) throw new Error("No payment method returned from Stripe")

      await apiAttachCard(paymentMethodId)

      // mark locally and notify parent to show Buy form
      markSavedCardLocal(true)
      setMessage("Card saved successfully.")
      card.clear()
      onSaved?.()
    } catch (err) {
      setMessage(err.message || "Failed to save card.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSaveCard} className="form-card" style={{ maxWidth: 520 }}>
      <div className="mb-3 text-start">
        <label className="form-label">Cardholder Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3 text-start">
        <label className="form-label">Card Details</label>
        <div
          style={{
            padding: "12px 10px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#111827", "::placeholder": { color: "#9ca3af" } },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success w-100" disabled={loading || !stripe}>
        {loading ? "Saving..." : "Save Card"}
      </button>

      {message ? (
        <p style={{ marginTop: 12, color: message.includes("success") ? "#059669" : "#ef4444" }}>{message}</p>
      ) : null}
    </form>
  )
}

function PurchasePlanBox({ planId, onPurchased }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [credits, setCredits] = useState(null)
  const [plan, setPlan] = useState(null)
  const [planLoading, setPlanLoading] = useState(false)

  useEffect(() => {
    let active = true
    if (!planId) {
      setPlan(null)
      return
    }
    setPlanLoading(true)
    setMessage("")
    fetchPlanById(planId)
      .then((res) => {
        if (!active) return
        if (res?.success && res?.plan) {
          setPlan(res.plan)
        } else {
          setPlan(null)
          setMessage(res?.message || "Failed to load plan details.")
        }
      })
      .catch((err) => {
        if (!active) return
        setPlan(null)
        setMessage(err?.message || "Failed to load plan details.")
      })
      .finally(() => {
        if (!active) return
        setPlanLoading(false)
      })
    return () => {
      active = false
    }
  }, [planId])

  const handlePurchase = async (e) => {
    e?.preventDefault?.()
    setLoading(true)
    setMessage("")
    try {
      const result = await buyPlan(planId)
      if (result?.success || result?.status === true) {
        setCredits(result?.credits ?? null)
        setMessage(result?.message || "Plan purchased successfully.")
        onPurchased?.(result)
      } else {
        const msg = result?.message || "Failed to buy plan."
        setMessage(msg)
        // If backend says no saved card, switch UI back to save-card
        if (/no saved card|save card first/i.test(msg)) {
          markSavedCardLocal(false)
        }
      }
    } catch (err) {
      const msg = err?.message || "Failed to buy plan."
      setMessage(msg)
      if (/no saved card|save card first/i.test(msg)) {
        markSavedCardLocal(false)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlePurchase} className="form-card" style={{ padding: 24, maxWidth: 520 }}>
      <h5 className="mb-3">Purchase Plan</h5>

      {planLoading ? (
        <p className="text-muted" style={{ marginTop: -8 }}>
          Loading plan details...
        </p>
      ) : plan ? (
        <div
          className="mb-3 text-start"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}
        >
          <div style={{ marginBottom: 6 }}>
            <strong>Plan:</strong> {plan.name || "—"}
          </div>
          <div style={{ marginBottom: 6 }}>
            <strong>Price:</strong> ${typeof plan.price === "number" ? plan.price : "—"}
          </div>
          <div style={{ marginBottom: 6 }}>
            <strong>Credits:</strong> {typeof plan.credits === "number" ? plan.credits : "—"}
          </div>
          {/* <div style={{ marginBottom: 6 }}>
            <strong>Free:</strong> {plan.isFree ? "Yes" : "No"}
          </div> */}
          {plan.description ? (
            <div style={{ marginBottom: 6 }}>
              <strong>Description:</strong> <span className="text-muted">{plan.description}</span>
            </div>
          ) : null}
          {Array.isArray(plan.features) && plan.features.length > 0 ? (
            <div style={{ marginBottom: 6 }}>
              <strong>Features:</strong>
              <ul style={{ margin: "6px 0 0 16px" }}>
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {/* {plan.createdAt ? (
            <div style={{ marginBottom: 0 }}>
              <strong>Created:</strong> {new Date(plan.createdAt).toLocaleString()}
            </div>
          ) : null} */}
        </div>
      ) : null}

      <p className="text-muted" style={{ marginTop: -8 }}>
        Plan ID: <code>{planId || "N/A"}</code>
      </p>

      {/* <p style={{ marginTop: -8 }}>
        Price: <code>{plan ? `$${plan.price}` : "—"}</code>
      </p> */}

      <button type="submit" className="btn btn-success w-100" disabled={loading || !planId || planLoading}>
        {loading ? "Processing..." : "Complete Purchase"}
      </button>
      {message ? (
        <p style={{ marginTop: 12, color: /successfully|purchased|activated/i.test(message) ? "#059669" : "#ef4444" }}>
          {message}
        </p>
      ) : null}
      {credits !== null ? (
        <p style={{ marginTop: 4, color: "#111827" }}>
          Updated credits: <strong>{credits}</strong>
        </p>
      ) : null}
    </form>
  )
}

function useQueryParam(name) {
  const [value, setValue] = useState("")
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      setValue(params.get(name) || "")
    } catch {}
  }, [name])
  return value
}

export default function Buycoin() {
  const navigate = useNavigate()
  const handleBackToHome = () => navigate("/")

  const stripePromise = useMemo(
    () =>
      loadStripe(
        "pk_test_51S0xo5PbJYWCjUgkbBipbYBsiu1jiY0KpwGYXyGVKQzfhe9dzVmoqPA3EPcnLpH4czevC6wtXDfurAB7Tl9Q7LSE00mbeqIGPx",
      ),
    [],
  )
  const [hasCard, setHasCard] = useState(hasSavedCardLocal())
  const [showPreloader, setShowPreloader] = useState(true)
  const planId = useQueryParam("planId")

  useEffect(() => {
    let mounted = true
    stripePromise.then(() => mounted && setShowPreloader(false))
    return () => {
      mounted = false
    }
  }, [stripePromise])

  const handleCardSaved = async () => {
    setHasCard(true)
    if (planId) {
      // optionally small delay to ensure backend has updated default payment method
      setTimeout(() => {
        const btn = document.querySelector("#purchase-plan-btn")
        btn?.click?.()
      }, 250)
    }
  }

  // Warning for placeholder pk to prevent confusion with Stripe keys
  const stripePk = (typeof window !== "undefined" && localStorage.getItem("stripe_pk")) || "pk_test_12345"
  const usingPlaceholderPk = stripePk === "pk_test_12345"

  return (
    <>
      {/* preloader */}
      {showPreloader && (
        <div className="preloader">
          <div className="loader-ripple">
            <div />
            <div />
          </div>
        </div>
      )}
      {/* preloader end */}

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
    .help-box { background: #0d9488; color: #fff; border-radius: 12px; padding: 1rem; text-align: center; margin: 1rem; }
    .help-box button { background: #fff; color: #0d9488; border: none; padding: 4px 15px; border-radius: 20px; font-size: 14px; }
    @media (max-width: 768px) { .sidebar { left: -300px; } }
  `,
        }}
      />
      <main className="main">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area */}
        <div className="main2">
          <TopBar />
          <div className="middle">
            <div className="row justify-content-center">
              <div className="col-lg-12 mb-5">
                <h4>Buy Plan</h4>
              </div>

              <div className="col-lg-8">
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

                {/* Optional visible warning if placeholder PK is used */}
                {usingPlaceholderPk && (
                  <div className="alert alert-warning" role="alert">
                    Stripe publishable key not set. Please set localStorage.setItem("stripe_pk", "pk_test_..."). Note:
                    Your backend must use a Stripe secret key (sk_...), not a publishable key.
                  </div>
                )}

                {!hasCard ? (
                  <div className="form-card" style={{ padding: 24 }}>
                    <h5 className="mb-3">Add a payment method</h5>
                    <ol className="mb-4" style={{ lineHeight: 1.6 }}>
                      <li>Create Stripe customer (auto when saving card).</li>
                      <li>Securely enter card details and save.</li>
                      <li>Card is attached and set as default for future payments.</li>
                    </ol>
                    <Elements stripe={stripePromise}>
                      <SaveCardForm onSaved={handleCardSaved} />
                    </Elements>
                    <div className="help-box" style={{ marginTop: 24 }}>
                      Need help? Your card is saved using Stripe’s secure Elements.
                    </div>
                  </div>
                ) : (
                  <>
                    {planId ? (
                      <div className="form-card" style={{ padding: 24 }}>
                        <PurchasePlanBox
                          planId={planId}
                          onPurchased={() => {
                            navigate("/account-settings?tab=coin-management")
                          }}
                        />
                        {/* Invisible button to support auto-click after saving card */}
                        <button
                          id="purchase-plan-btn"
                          style={{ display: "none" }}
                          onClick={(e) => e.preventDefault()}
                        />
                      </div>
                    ) : (
                      <div className="form-card" style={{ padding: 24 }}>
                        <h5 className="mb-2">Select a plan from Pricing</h5>
                        <p className="text-muted">
                          No plan selected. Go back to Pricing and choose a plan to purchase.
                        </p>
                        <a href="/plans" className="btn btn-outline-dark">
                          View Pricing Plans
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
