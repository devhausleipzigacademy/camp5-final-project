import { PrismaClient } from "@prisma/client";
import { DiagnosticCategory } from "typescript";
import { mockKitchenCategories, mockSubCategories } from "../assets/data";

const prisma = new PrismaClient();

async function main() {
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();

    const prismaCallCat = mockKitchenCategories.kitchen.map(async (cat) => {
        const categories = await prisma.category.create({
            data: {
                title: cat.title,
                description: cat.description,
            },
        });
        cat.subcategories.map(async (subCat) => {
            const subCategories = await prisma.subcategory.create({
                data: {
                    title: subCat,
                    categoryId: categories.identifier,
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
