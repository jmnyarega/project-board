import { PrismaClient } from "../src/generated/prisma";
import Chance from "chance";
const prisma = new PrismaClient()

const random = new Chance();

async function main() {
    await prisma.user.deleteMany();
    await prisma.card.deleteMany();
    await prisma.column.deleteMany();
    await prisma.board.deleteMany();

    await prisma.user.createMany({
        data: Array.from("000".split("")).map(() =>
        ({
            name: random.name(),
            id: crypto.randomUUID()
        })
        ),
        skipDuplicates: true,
    });

    const users = await prisma.user.findMany();
    await prisma.board.createMany({
        data: Array.from("0000000".split("")).map(() =>
        ({
            id: crypto.randomUUID(),
            title: random.capitalize(random.word({ length: 10 })),
            userId: random.pickone(users).id
        })),
        skipDuplicates: true,
    });

    const boards = await prisma.board.findMany();
    await prisma.column.createMany({
        data: Array.from("000000000000".split("")).map(() =>
        ({
            id: crypto.randomUUID(),
            name: random.capitalize(random.word({ length: 10 })),
            position: random.integer({ min: 0, max: 10 }) + "",
            boardId: random.pickone(boards).id
        })),
        skipDuplicates: true,
    });


    const columns = await prisma.column.findMany();
    await prisma.card.createMany({
        data: Array.from("00000000000000000000000".split("")).map(() =>
        ({
            id: crypto.randomUUID(),
            name: random.capitalize(random.word({ length: 10 })),
            content: random.paragraph(),
            position: random.integer({ min: 0, max: 10 }) + "",
            columnId: random.pickone(columns).id
        })),
        skipDuplicates: true,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })