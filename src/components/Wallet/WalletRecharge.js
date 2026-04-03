import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AmountInput from "./AmountInput";
import SavedCards from "./SavedCards";
import NewCardPayment from "./NewCardPayment";
import { chargeSavedCard, getPlanPrice } from "../../api/wallet";

const WalletRecharge = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // console.log("amount", selectedCard.id);
  const [searchParams] = useSearchParams();

  const planId = searchParams.get("planId");
  // const planId = "032ef677-3541-4a8b-9ad2-9b032b5604e5";
  // console.log("planId", planId);
  useEffect(() => {
    if (!planId) return;

    const fetchPrice = async () => {
      // const res = await getPlanPrice(planId);
      const data = await getPlanPrice(planId);
      // console.log("aaaaaa", data.plan.price);
      // 👇 yahin price set ho rahi hai
      // setAmount(res.data.price);
      // 👇 SAFE SET
      setAmount(data?.plan?.price ? String(data.plan.price) : "");
    };

    fetchPrice();
  }, [planId]);

  const rechargeWithSavedCard = async () => {
    if (!selectedCard) {
      setError("Please select a saved card");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

  await chargeSavedCard(planId);

      setSuccess("Wallet recharge initiated successfully");
      setAmount("");
      setSelectedCard(null);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to recharge wallet. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg w-100" style={{ maxWidth: "420px" }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-sm btn-outline-secondary me-3"
              style={{ width: "40px", height: "40px", padding: 0 }}
            >
              ←
            </button>
            <h4 className="card-title fw-bold mb-0">
              💳 Wallet Recharge
            </h4>
          </div>

          {/* Alerts */}
          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && <div className="alert alert-success py-2">{success}</div>}

          {/* Amount */}
          {/* <AmountInput amount={amount} /> */} 

          {/* Saved cards */}
          <div className="mb-3">
            <SavedCards onSelect={setSelectedCard} />
          </div>

          {/* Recharge button */}
          <button
            onClick={rechargeWithSavedCard}
            className="btn btn-success w-100 py-2 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Processing...
              </>
            ) : (
              "Recharge with Saved Card"
            )}
          </button>

          {/* Divider */}
          <div className="text-center my-3 text-muted fw-semibold">OR</div>

          {/* New card payment */}
          <NewCardPayment amount={amount} />
        </div>
      </div>
    </div>
  );
};

export default WalletRecharge;
