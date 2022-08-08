// endpoints to fetch all locations

import { Item, Location, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            let locations: Location[] = [];
            locations = await prisma.location.findMany();
            res.status(200).json(locations);
        } catch (err) {
            console.log(err);
        }
    }
}

// Location - User - Item[]
