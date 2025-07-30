import {v4 as uuid} from "uuid";
import {Prisma, PrismaClient, Board, Card, User, Column} from "./generated/prisma";

const prisma = new PrismaClient();

export class BoarddataSource {
    async getColumns() {
        return await prisma.column.findMany();
    }
    async getCards() {}
    async getBoards() {}
    async getUser() {}
    async createBoard() {}
    async createCard() {}
    async createColumn() {}
    async updateColumn() {}
    async updateBoard() {}
    async updateCard() {}
}