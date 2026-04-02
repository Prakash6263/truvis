import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setError("");

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment successful.👍👍");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Card Details</label>
        <div className="form-control p-3">
          <CardElement />
        </div>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={!stripe || loading}>
        {loading ? "Processing..." : "💰 Pay with New Card"}
      </button>
    </form>
  );
};

export default PaymentForm;
