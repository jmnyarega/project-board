import { pubsub } from "../pubsub";
import { BoarddataSource } from "../datasource";

const datasource = new BoarddataSource();

export type CreateCard = {
  columnId: string;
  position: string;
  content: string;
  name: string
}

const mutation = {
  updateBoard: async (_, cardId: number) => { },
  moveCard: async (_, args: { id: string, position: string }) => await datasource.moveCard(args),
  createCard: async (_, args: CreateCard) => await datasource.createCard(args),
  deleteCard: async (_, args: { id: string }) => await datasource.deleteCard(args)
}

export default mutation;
