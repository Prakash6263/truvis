const AmountInput = ({ amount, setAmount, allowEdit = false }) => {
  const handleChange = (e) => {
    if (!allowEdit) return; // User edit not allowed

    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setAmount("");
      return;
    }

    // Prevent negative values
    if (Number(value) < 0) return;

    setAmount(value);
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">Recharge Amount</label>

      {/* Amount input */}
      <div className="input-group mb-2">
        <span className="input-group-text">$</span>
        <input
          type="number"
          className={`form-control ${
            amount !== "" && Number(amount) <= 0 ? "is-invalid" : ""
          }`}
          placeholder="Enter amount"
          value={amount}
          min="1"
          inputMode="numeric"
          onChange={handleChange}
          readOnly={!allowEdit} // Lock input if editing not allowed
        />
      </div>

      {/* Validation text */}
      {amount !== "" && Number(amount) <= 0 ? (
        <div className="invalid-feedback d-block">
          Please enter an amount greater than ₹0
        </div>
      ) : allowEdit ? (
        <div className="form-text">You can change the amount if needed</div>
      ) : (
        <div className="form-text">Amount is based on selected plan</div>
      )}
    </div>
  );
};

export default AmountInput;
