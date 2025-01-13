import { useEffect, useState } from "react";
import "./MainContainer.css";
import GrupoCard from "../grupoCard-component/GrupoCard";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const MainContainer = () => {
  // Deleta o GrupoCardsArray selecionado por meio de seu ID
  function handleDeleteGroup(id: string) {
    const yesToDelete = confirm("Do you really want to delete?");

    if (!yesToDelete) return;

    setGrupoCardsArray((prevGrupoCardsArray) =>
      prevGrupoCardsArray.filter((g) => g.props.id !== id)
    );
  }

  // Cria um ID aleatório e único
  function generateUniqueId() {
    return uuidv4();
  }

  // Restaura os cards do filho da memória
  const storagedChildCardsArray = JSON.parse(
    localStorage.getItem("storage_childCardsArray") || "[]"
  ).map(
    (item: { id: string; cards: { sentence: string; answer: string }[] }) => {
      return item;
    }
  );
  const [childCardsArray, setChildCardsArray] = useState<
    { id: string; cards: { sentence: string; answer: string }[] }[]
  >(() => {
    return storagedChildCardsArray ? storagedChildCardsArray : [];
  });

  // Função chamada de dentro do filho
  function updateGrupoCardArrayOfCards(
    id: string,
    cards: { sentence: string; answer: string }[]
  ) {
    // Verificamos se há algum objeto já com o mesmo ID, se houver substitui pelo novo objeto, se não houver cria um novo e adiciona
    const updatedChildCardsArray = childCardsArray.map((item) =>
      item.id === id ? { id, cards } : item
    );
    if (!updatedChildCardsArray.some((item) => item.id === id)) {
      updatedChildCardsArray.push({ id, cards });
    }
    setChildCardsArray(updatedChildCardsArray);
  }
  useEffect(() => {
    localStorage.setItem(
      "storage_childCardsArray",
      JSON.stringify(childCardsArray)
    );
  }, [childCardsArray]);

  // Restaura os GrupoCards da memória
  const storagedGrupoCards = JSON.parse(
    localStorage.getItem("storage_gruposCards") || "[]"
  ).map(
    (item: {
      nome: string;
      id: string;
      cards: { sentence: string; answer: string }[];
    }) => (
      <GrupoCard
        onDeleteClick={handleDeleteGroup}
        id={item.id}
        nome={item.nome}
        cards={(() => {
          const filtered = childCardsArray.find((val) => val.id == item.id);
          return filtered ? filtered.cards : [];
        })()}
        onUpdateCards={updateGrupoCardArrayOfCards}
      />
    )
  );
  const [grupoCardsArray, setGrupoCardsArray] = useState<JSX.Element[]>(() => {
    return storagedGrupoCards ? storagedGrupoCards : [];
  });

  function handleAddGroup() {
    const name = window.prompt("Digite o nome");
    if (!name) return;
    setGrupoCardsArray([
      ...grupoCardsArray,
      <GrupoCard
        onDeleteClick={handleDeleteGroup}
        nome={name}
        cards={[]}
        id={generateUniqueId()}
        onUpdateCards={updateGrupoCardArrayOfCards}
      />,
    ]);
  }

  useEffect(() => {
    const grupoCardsData = grupoCardsArray.map((e) => {
      return {
        nome: e.props.nome,
        id: e.props.id,
        cards: e.props.cards,
      };
    });

    localStorage.setItem("storage_gruposCards", JSON.stringify(grupoCardsData));

    console.log(grupoCardsData);
  }, [grupoCardsArray]);

  const countOfGrupos = grupoCardsArray.length;

  return (
    <>
      <main>
        <div className="container shelf">
          <button
            className="addGroupButton"
            onClick={() => {
              handleAddGroup();
            }}
          >
            <AddCircleIcon fontSize="large" />
          </button>
          <div
            className={`shelf-background ${countOfGrupos <= 0 ? "" : "invisible"}`}
            onClick={(e) => {
              if (e.detail === 2) {
                handleAddGroup();
              }
            }}
          >
            <h2>
              Clique duas vezes para adicionar <br /> <span>+</span>
            </h2>
          </div>
          {grupoCardsArray.map((grupo, index) => {
            return React.cloneElement(grupo, { key: index });
          })}
        </div>
      </main>
    </>
  );
};

export default MainContainer;
