import { useEffect, useState } from "react";
import { getSavedCards, removeSavedCard } from "../../api/wallet";

const SavedCards = ({ onSelect }) => {
  const [cards, setCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchCards = async () => {
    try {
      const res = await getSavedCards();
      setCards(res.cards || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch cards when component mounts
  useEffect(() => {
    fetchCards();
  }, []);

  if (cards.length === 0) {
    return (
      <div className="text-center text-muted py-3">
        No saved cards available
      </div>
    );
  }

  return (
    <div className="list-group">
      {cards.map((card) => (
        <label
          key={card.id}
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded mb-2 shadow-sm ${
            selectedId === card.id ? "border-success" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center gap-3">
            <input
              className="form-check-input mt-0"
              type="radio"
              name="card"
              checked={selectedId === card.id}
              onChange={() => {
                setSelectedId(card.id);
                onSelect(card);
              }}
            />

            <div>
              <div className="fw-semibold">💳 {card.brand}</div>
              <div className="text-muted small">•••• {card.last4}</div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={async (e) => {
              e.preventDefault();
              await removeSavedCard(card.id);
              fetchCards(); // ✅ refresh after removal
            }}
          >
            Remove
          </button>
        </label>
      ))}
    </div>
  );
};

export default SavedCards;
