import { Category, Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let categories: Category[] = [];
      categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (err) {
      console.log(err);
    }
  }
}
