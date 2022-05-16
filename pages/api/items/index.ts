import { PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const items = await prisma.item.findMany();
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}
