import { Item, PrismaClient, User } from "@prisma/client";
import { sub } from "date-fns";
import { DiagnosticCategory } from "typescript";
import { leafPathMap, leaves } from "../assets/categories";

const prisma = new PrismaClient();

function cleanupDatabase(prisma: PrismaClient) {
	const propertyNames = Object.getOwnPropertyNames(prisma);
	const modelNames = propertyNames.filter(
		(propertyName) => !propertyName.startsWith("_")
	);

	//@ts-ignore
	return Promise.all(modelNames.map((model) => prisma[model].deleteMany()));
}

// export const rankModelDict = ["domain", "category", "subcategory"];

function recursiveConnectOrCreate(path: Array<string>, query = {}, depth = 1) {
	const createObj = { title: path.at(-depth) };
	//@ts-ignore
	query.parent = {
		connectOrCreate: {
			where: { title: path.at(-depth) },
			create: createObj,
		},
	};

	if (depth < path.length) {
		recursiveConnectOrCreate(path, createObj, depth + 1);
	}

	return query;
}

async function main() {
	await cleanupDatabase(prisma);

	for (const leaf of leaves) {
		const path = leafPathMap[leaf];

		let itemData = {
			title: `Test Item ${path} + ${leaf}`,
			images: ["example.url"],
			description: "Test description",
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
