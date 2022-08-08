import { User, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const prisma = new PrismaClient();

// identifier: string;
//     createdAt: Date;
//     updatedAt: Date;
//     firstname: string;
//     lastname: string;
//     email: string;
//     passwordHash: string;
//     passwordSalt: string;
//     profilePicture: string | null;
//     rating: number;
//     favorite: Prisma.JsonValue;

function userModel() {
  return z
    .object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string(),
      passwordHash: z.string(),
      passwordSalt: z.string(),
      profilePicture: z.string(),
      rating: z.number(),
      favorite: z.array(z.string()),
    })
    .strict();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const userData = await checkData(req.body);
      // const locationData = await userData.
      let user = await prisma.user.create({
        data: {
          ...userData,
        },
      });
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof ZodError) {
        console.log("z-error:", err);
        res.status(422).send(err.message);
      } else {
        console.log("Error:", err);
        res.status(500).end();
      }
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
async function checkData(rawData: any) {
  const data = userModel().parse(rawData);
  return data;
}
