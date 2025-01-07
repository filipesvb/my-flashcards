import Card from "./Card";

class GrupoCards {
  nome: string = "Grupo";
  quantidade: number = 0;
  vetorCards: Card[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }
}

export default GrupoCards;
