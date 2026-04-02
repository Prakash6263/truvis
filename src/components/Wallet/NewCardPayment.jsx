import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";
import { createPaymentIntent } from "../../api/wallet";
import { useSearchParams } from "react-router-dom";

const NewCardPayment = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId");

  // Automatically create payment intent when component mounts
  useEffect(() => {
    const createIntent = async () => {
      if (!planId) {
        setError("Plan ID is missing");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        setError("Invalid amount provided for payment");
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Call API to create payment intent
        const res = await createPaymentIntent(planId, true);

        if (!res?.client_secret) {
          throw new Error("Invalid server response: client_secret missing");
        }

        // console.log("Payment intent created:", res);

        setClientSecret(res.client_secret);
      } catch (err) {
        console.error("createIntent error:", err);
        setError(err.message || "Failed to initialize payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [planId, amount]);
// console.log("amount",amount)
// console.log("planId",planId)
  return (
    <div className="mt-3">
      {error && <div className="alert alert-danger py-2">{error}</div>}

      {!clientSecret && !error && loading && (
        <button className="btn btn-outline-primary w-100 py-2 fw-semibold" disabled>
          <span className="spinner-border spinner-border-sm me-2" />
          Initializing Payment...
        </button>
      )}

      {clientSecret && (
        <div className="card border-0 shadow-sm mt-3">
          <div className="card-body">
            <h6 className="fw-bold mb-3 text-center">🔐 Secure Card Payment</h6>
            <PaymentForm clientSecret={clientSecret} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewCardPayment;
