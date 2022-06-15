import { Domain, PrismaClient } from ".prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const domainTitle = req.body.title as string;

      let domains: Domain[] = await prisma.domain.findMany({
        where: {
          title: domainTitle,
        },
      });
      res.status(200).json(domains);
    } catch (err) {
      console.log(err);
    }
  }
}
