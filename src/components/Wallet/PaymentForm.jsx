// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const PaymentForm = ({ clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     try {
//       setLoading(true);
//       setError("");

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setError(error.message);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         Swal.fire({
//           icon: "success",
//           title: "Payment Successful!",
//           text: "Your payment has been processed successfully.",
//           confirmButtonText: "OK",
//           confirmButtonColor: "#28a745",
//           allowOutsideClick: false,
//         }).then(() => {
//           navigate("/dashboard");
//         });
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label className="form-label fw-semibold">Card Details</label>
//         <div className="form-control p-3">
//           <CardElement />
//         </div>
//       </div>

//       {error && <div className="alert alert-danger py-2">{error}</div>}

//       <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={!stripe || loading}>
//         {loading ? "Processing..." : "💰 Pay with New Card"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;




import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmRecharge } from "../../api/wallet";
 
const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
 
    try {
      setLoading(true);
      setError("");
 
      // 1. Stripe से पेमेंट करवाएं
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
 
      if (stripeError) {
        setError(stripeError.message);
        return;
      }
 
      // 2. पेमेंट सक्सेस होने पर Backend को बताएं (Coins Add करने के लिए)
      if (paymentIntent.status === "succeeded") {
        
        await confirmRecharge(paymentIntent.id); // Backend API Call
 
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your payment has been processed and coins are added!",
          confirmButtonText: "OK",
          confirmButtonColor: "#28a745",
          allowOutsideClick: false,
        }).then(() => {
          navigate("/dashboard");
        });
      }
    } catch (err) {
      setError(err.message || "Something went wrong while adding coins. Please try again.");
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