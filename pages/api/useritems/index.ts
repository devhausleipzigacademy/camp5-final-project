import { Item, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const user = req.query.userId as string;
		try {
			let userItems: Item[] = [];
			userItems = await prisma.item.findMany({
				where: {
					userId: user,
				},
			});
			res.status(200).json(userItems);
		} catch (err) {
			console.log(err);
			res.status(500).end();
		}
	}
}
