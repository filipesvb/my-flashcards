import Card from "./Card";

class GrupoCards {
  nome: string = "Grupo";
  quantidade: number = 0;
  vetorCards: Card[];

  constructor(nome: string) {
    this.nome = nome;
    this.vetorCards = [];
  }

  addCard(card: Card) {
    this.vetorCards.push(card);
  }

  logCards(obj: GrupoCards) {
    console.log(obj.vetorCards);
  }
}

export default GrupoCards;
