import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export class BoarddataSource {
    async getColumns() {
        return await prisma.column.findMany();
    }
    async getCards() {
        return await prisma.card.findMany();
    }
    async getBoards() {
        try {
            const data = await prisma.board.findMany({
                include: {
                    Column: {
                        include: {
                            Card: true
                        }
                    }
                }
            });
            return data;
        } catch (error) {
            console.log("asdasd");
            return Error(error);
        }
    }
    async getBoard(id: string) {
        console.log(id);
        return await prisma.board.findFirst({
            where: {
                id
            },
            include: {
                Column: {
                    include: {
                        Card: true
                    }
                }
            }
        })
    }
    async getUser() { }
    async createBoard() { }
    async createCard() { }
    async createColumn() { }
    async updateColumn() { }
    async updateBoard() { }
    async updateCard() { }
}