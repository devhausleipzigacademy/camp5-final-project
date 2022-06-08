import { PrismaClient } from "@prisma/client";
import { sub } from "date-fns";
import { DiagnosticCategory } from "typescript";
import { mockData, mockKitchenCategories } from "../assets/data";

const prisma = new PrismaClient();

async function main() {
    await prisma.domain.deleteMany();
    await prisma.category.deleteMany();
    await prisma.location.deleteMany();
    await prisma.user.deleteMany();
    await prisma.item.deleteMany();

    const domains = await prisma.domain.create({
        data: {
            title: "Kitchen",
            description: "description",
        },
    });

    const prismaCallCat = mockKitchenCategories.kitchen.map(
        async (category) => {
            await prisma.category.create({
                data: {
                    title: category.title,
                    description: category.description,
                    domain: { connect: { title: "Kitchen" } },
                },
            });
        }
    );
    const prismaCallData = mockData.map(async (data) => {
        const user = await prisma.user.create({
            data: {
                firstname: data.user!.firstname,
                lastname: data.user!.lastname,
                email: data.user!.email,
                profilePicture: data.user!.profilePicture,
                passwordHash: data.user!.passwordHash,
                passwordSalt: data.user!.passwordSalt,
                rating: data.user!.rating,
                favorite: data.user!.favorite,
            },
        });

        await prisma.location.create({
            data: {
                ...data.location!,
                userId: user.identifier,
            },
        });

        data.items?.map(async (item) => {
            await prisma.item.create({
                data: {
                    ...item,
                    user: { connect: { identifier: user.identifier } },
                    category: { connect: { title: item.category } },
                },
            });
        });
    });
    await Promise.all(prismaCallCat);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });