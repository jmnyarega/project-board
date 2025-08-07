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
  moveCard: (_, args: { id: string, position: string }) => datasource.moveCard(args),
  createCard: (_, args: CreateCard) => datasource.createCard(args),
  deleteCard: (_, args: { id: string }) => datasource.deleteCard(args)
}

export default mutation;
