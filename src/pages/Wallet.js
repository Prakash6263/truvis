import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import WalletRecharge from "../components/Wallet/WalletRecharge"

const stripePromise = loadStripe("pk_test_51S0xo5PbJYWCjUgkbBipbYBsiu1jiY0KpwGYXyGVKQzfhe9dzVmoqPA3EPcnLpH4czevC6wtXDfurAB7Tl9Q7LSE00mbeqIGPx")   // Stripe ka Publishable Key

// const stripePromise = loadStripe(
//   process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
// );

export default function Wallet() {
  return (
    <Elements stripe={stripePromise}>
      <WalletRecharge />
    </Elements>
  )
}
