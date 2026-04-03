const API_BASE_URL = "https://python.aitechnotech.in/truvis";

const getAuthHeaders = () => {
  // Get token from localStorage (saved during login)
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// WALLET APIs
export const createPaymentIntent = async (planId, saveCard = true) => {
  try {
    const res = await fetch(`${API_BASE_URL}/wallet/create-payment-intent`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        plan_id: planId, // backend expects plan_id
        save_card: saveCard, // backend expects save_card
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Create payment failed (${res.status})`,
      );
    }

    const data = await res.json(); // ✅ client_secret is here
    // console.log("Payment intent created:", data);
    return data;
  } catch (err) {
    console.error("createPaymentIntent error:", err);
    throw err;
  }
};

// Get saved cards
export const getSavedCards = async () => {
  // console.log("getSavedCards api");

  try {
    const res = await fetch(`${API_BASE_URL}/wallet/saved-cards`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Get cards failed (${res.status})`);
    }

    const data = await res.json(); // ✅ parse JSON first
    // console.log("getSavedCards data:", data); // ✅ now you see actual cards
    return data;
  } catch (err) {
    console.error("getSavedCards error:", err);
    throw err;
  }
};



// Charge saved card



export const chargeSavedCard = async (planId) => {
  console.log("plan_id", planId)

  try {
    const res = await fetch(`${API_BASE_URL}/wallet/charge-saved-card`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        plan_id: planId, // ✅ backend expected key
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(data?.message || `Charge card failed (${res.status})`)
    }

    console.log("Saved card charged successfully:", data)
    return data
  } catch (err) {
    console.error("chargeSavedCard error:", err)
    throw err
  }
}


// Remove saved card
export const removeSavedCard = async (payment_method_id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/wallet/remove-saved-card`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_method_id }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Remove card failed (${res.status})`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("removeSavedCard error:", err);
    throw err;
  }
};

// Fetch plan price
export const getPlanPrice = async (planId, saveCard = true) => {
  // console.log("planId api", planId);

  try {
    const res = await fetch(`${API_BASE_URL}/plan/price`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        plan_id: planId, // ✅ backend expects plan_id
        save_card: saveCard, // ✅ backend expects save_card
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Backend error:", res.status, errorData);
      throw new Error(errorData.message || "Failed to fetch plan price");
    }

    const data = await res.json();
    const price = data.plan.price;
    //  console.log("Plan price:", price);
    return data; // ✅ return parsed JSON
  } catch (err) {
    console.error("getPlanPrice error:", err);
    throw err;
  }
};

// confirmRecharge
export const confirmRecharge = async (paymentIntentId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/wallet/confirm-recharge`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    });

    if (!res.ok) {
      // Try to parse backend error
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Recharge confirmation failed (${res.status})`,
      );
    }

    const data = await res.json();
    console.log("Recharge confirmed:", data);
    return data;
  } catch (err) {
    console.error("confirmRecharge error:", err);
    throw err;
  }
};
