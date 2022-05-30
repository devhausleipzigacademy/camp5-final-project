import { Item, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.identifier as string | undefined;
    try {
      let items: Item | null;
      if (id) {
        items = await prisma.item.findUnique({
          where: {
            identifier: id,
          },
        });
      } else {
        throw new Error("item not found");
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}
