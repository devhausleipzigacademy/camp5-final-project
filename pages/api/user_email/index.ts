import { User, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email = req.query.email as string;
    try {
      let user: User | null;
      if (email) {
        user = await prisma.user.findFirst({
          where: {
            email: email,
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
