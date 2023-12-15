import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

interface CardData {
  code: string;
  image: string;
}

function Deck() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [deckId, setDeckId] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

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
    if (deckId && started && cards.length < 5) {
      timerRef.current = window.setInterval(async () => {
        async function getCard(deckId: string) {
          const res = await axios.get<{ cards: CardData[] }>(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
          );

          return res.data.cards[0];
        }

        const card = await getCard(deckId);
        setCards((cards) => [...cards, card]);
      }, 1000);
    }

    return () => clearInterval(timerRef.current as number);
  }, [cards, deckId, started]);

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setStarted((started) => !started);
  };

  return deckId ? (
    <div>
      <button onClick={handleClick}>Draw 5 cards..</button>
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
