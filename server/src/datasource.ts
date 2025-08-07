import { PrismaClient } from "@prisma/client";
import { pubsub } from "./pubsub";
import { CreateCard } from "./resolvers/mutation";

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
            return await prisma.board.findMany({
                include: {
                    Column: {
                        include: {
                            Card: true
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }
    async getBoard(id: string) {
        try {
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
        } catch (error) {
            return Error(error);
        }
    }
    async getUser() { }
    async createBoard() { }
    async createCard(args: CreateCard) {
        const { name, position, column: columnId, content } = args;
        const card = await prisma.card.create({
            data: {
                name, position, columnId, id: crypto.randomUUID(), content
            }
        });
        pubsub.publish('CARD_CREATED', { cardsMoved: card });
    }
    async createColumn() { }
    async updateColumn() { }
    async updateBoard() { }
    async moveCard(args: { id: string, position: string }) {
        const { id, position } = args;
        const [oldId, newId] = id.split(":");
        const [oldPostion, newPosition] = position.split(":");

        await prisma.card.update({
            where: { id: oldId },
            data: { position: newPosition }
        });

        await prisma.card.update({
            where: { id: newId },
            data: { position: oldPostion }
        });
        pubsub.publish('CARDS_MOVED', { cardsMoved: id });
    }
}