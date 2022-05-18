import { PrismaClient } from "@prisma/client";
import { mockData } from "../assets/data";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: mockData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
