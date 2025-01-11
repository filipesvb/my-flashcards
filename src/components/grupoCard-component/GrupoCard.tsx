/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./GrupoCard.css";

interface GrupoCardProps {
  nome: string;
  id: string;
  cards: { sentence: string; answer: string }[];
  onUpdateCards: (
    id: string,
    cards: { sentence: string; answer: string }[]
  ) => void;
}

const GrupoCard = ({ nome, id, cards, onUpdateCards }: GrupoCardProps) => {
  // Vetor de cards
  const [cardsArray, setCardsArray] = useState<
    { sentence: string; answer: string }[]
  >(() => {
    return cards ? cards : [];
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sentence = form.elements.namedItem("sentence") as HTMLInputElement;
    const answer = form.elements.namedItem("answer") as HTMLInputElement;
    if (!sentence.value) return;
    setCardsArray([
      ...cardsArray,
      { sentence: sentence.value, answer: answer.value },
    ]);

    form.reset();
  }
  useEffect(() => {
    onUpdateCards(id, cardsArray);
  }, [id, onUpdateCards, cardsArray]);

  return (
    <>
      <div className="grupoCard">
        <h1>{nome}</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Sentence" name="sentence" />
          </label>
          <label>
            <input type="text" placeholder="Answer" name="answer" />
          </label>
          <button type="submit">Adicionar</button>
        </form>
        <button
          onClick={() => {
            console.log(cardsArray);
          }}
        >
          Log
        </button>
      </div>
    </>
  );
};

export default GrupoCard;
