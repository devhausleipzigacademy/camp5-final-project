import { User, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.identifier as string;
    try {
      let user: User | null;
      if (id) {
        user = await prisma.user.findUnique({
          where: {
            identifier: id,
          },
        });
      } else {
        throw new Error("user not found");
      }
      const data = res.status(200).json(user);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
