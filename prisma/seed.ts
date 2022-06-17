import { Item, PrismaClient, User } from "@prisma/client";
import { sub } from "date-fns";
import { DiagnosticCategory } from "typescript";
import { leafPathMap, leaves } from "../assets/class-models-paths";
import { recursiveConnectOrCreate } from "../utils/recursiveConnectOrCreate";

const prisma = new PrismaClient();

// this method of wiping the DB requires `onDelete: cascade` for all relations to be set in prisma schema
// this would likely be undesirable in production, since it's good to prevent accidental massive deletions
function cleanupDatabase(prisma: PrismaClient) {
	const propertyNames = Object.getOwnPropertyNames(prisma);
	const modelNames = propertyNames.filter(
		(propertyName) => !propertyName.startsWith("_")
	);

	//@ts-ignore
	return Promise.all(modelNames.map((model) => prisma[model].deleteMany()));
}

async function main() {
	await cleanupDatabase(prisma);

	for (const leaf of leaves) {
		const path = leafPathMap[leaf];

		let itemData = {
			title: `Test Item ${path} + ${leaf}`,
			images: ["https://unsplash.com/photos/6HYqdm0CniQ"],
			description: "Test description",
			details: {
				condition: "***",
			},
			sellType: "FREE",
			class: leaf,
			user: {
				create: {
					firstname: "Johannes",
					lastname: "Smith",
					email: "johannes.smith@email.de",
					passwordHash: "effegysdgerzerz",
					passwordSalt: "bnfhjfdjdfjgfj",
					profilePicture:
						"https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687",
					rating: 2.1,
					favorite: [],
					location: {
						create: {
							lat: Math.random() * 2 + 50,
							lon: Math.random() * 2 + 11,
							address: "Kippenbergstraße 28, 04317 Leipzig",
						},
					},
				},
			},
		};

		// mutates itemData
		recursiveConnectOrCreate(path, itemData);

		//@ts-ignore
		await prisma.item.create({ data: itemData });
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
