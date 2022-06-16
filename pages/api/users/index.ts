import { User, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			let users: User[] = [];
			users = await prisma.user.findMany();
			res.status(200).json(users);
		} catch (err) {
			console.log(err);
			res.status(500).end();
		}
	}
}
