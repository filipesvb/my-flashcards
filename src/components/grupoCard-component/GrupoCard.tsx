/* eslint-disable @typescript-eslint/no-unused-vars */
import GrupoCards from "../../types/GrupoCards";
import "./GrupoCard.css";

const GrupoCard = ({ nome }: { nome: string }) => {
  const grupoObj = new GrupoCards(nome);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const sentence = form.elements.namedItem("sentence") as HTMLInputElement;
    const answer = form.elements.namedItem("answer") as HTMLInputElement;

    grupoObj.addCard({
      sentence: sentence.value,
      answer: answer.value,
    });

    form.reset();
  }

  return (
    <>
      <div className="grupoCard">
        <h1>{grupoObj.nome}</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Sentence" name="sentence" />
          </label>
          <label>
            <input type="text" placeholder="Answer" name="answer" />
          </label>
          <button type="submit">Adicionar</button>
        </form>
        <button onClick={() => grupoObj.logCards(grupoObj)}>Log</button>
      </div>
    </>
  );
};

export default GrupoCard;
