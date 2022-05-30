import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.identifier as string;
    try {
      let item: Item | null;
      if (id) {
        item = await prisma.item.findUnique({
          where: {
            identifier: id,
          },
        });
      } else {
        throw new Error("item not found");
      }
      const data = res.status(200).json(item);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
