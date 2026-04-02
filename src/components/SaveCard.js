import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import {
  createCustomer,
  createSetupIntent,
  attachCard,
} from "../api/wallet"

export default function SaveCard() {
  const stripe = useStripe()
  const elements = useElements()

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setMessage("")

    try {
      await createCustomer()
      const { clientSecret } = await createSetupIntent()

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name },
        },
      })

      if (result.error) throw new Error(result.error.message)

      await attachCard(result.setupIntent.payment_method)

      setMessage("✅ Card saved successfully")
      elements.getElement(CardElement).clear()
      setName("")
    } catch (err) {
      setMessage("❌ " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSave} style={{ maxWidth: 400 }}>
      <h3>Save Card</h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cardholder name"
        required
      />

      <div style={{ padding: 12, border: "1px solid #ccc" }}>
        <CardElement />
      </div>

      <button disabled={!stripe || loading}>
        {loading ? "Saving..." : "Save Card"}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}
