import { BoarddataSource } from "../datasource";

const datasource = new BoarddataSource();

const query = {
  boards: () => datasource.getBoards(),
  board: (_, args) => datasource.getBoard(args.id),
  columns: () => datasource.getColumns(),
  cards: () => datasource.getCards()
};
export default query;