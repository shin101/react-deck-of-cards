import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

function Deck() {
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState("");
  const [started, setStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function loadDeck() {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckId(res.data.deck_id);
    }
    loadDeck();
  }, []);

  useEffect(() => {
    if (deckId && started && cards.length < 52) {
      timerRef.current = setInterval(async () => {
        async function getCard(deckId) {
          const res = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
          );

          return res.data.cards[0];
        }

        const card = await getCard(deckId);
        setCards((cards) => [...cards, card]);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [cards, deckId, started]);

  const handleClick = (evt) => {
    evt.preventDefault();
    setStarted((started) => !started);
  };

  return deckId ? (
    <div>
      <button onClick={handleClick}>Gimme a card!</button>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "30px" }}>
        {cards.map((c) => (
          <Card key={c.code} img={c.image} />
        ))}
      </div>
    </div>
  ) : (
    <h3>Loading</h3>
  );
}

export default Deck;
