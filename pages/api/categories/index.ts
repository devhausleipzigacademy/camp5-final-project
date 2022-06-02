import { Category, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let categories: Category[] = await prisma.item.findMany({
          where: {
            
          },
        });
      } 
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}
