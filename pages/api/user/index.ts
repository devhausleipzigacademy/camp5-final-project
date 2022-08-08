import { User, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const userData = await req.body;
      // const locationData = await userData.
      let user: User | null = null;
      user = await prisma.user.create({
        data: {
          ...userData,
        },
      });
      res.status(200).json(user);
    } catch (err) {
      console.log("Error:", err);
    }
  }
  if (req.method === "GET") {
    const id = req.query.identifier as string;
    try {
      let user: User | null = null;
      if (id) {
        user = await prisma.user.findUnique({
          where: {
            identifier: id,
          },
        });
      } else {
        res.status(500).send("User ID is required");
      }

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("user not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }
}
