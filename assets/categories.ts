import { generatePathLeafPairs } from "../utils/lazyFlatten";
import z from Zod;

class Leaf {
	label;
	details;
	constructor(label: string, details: Array<string>) {
		this.label = label;
		this.details = details;
	}
}

export const ontology = {
	Kitchen: {
		Appliances: [
			new Leaf("Toasters", []),
			new Leaf("Blenders", []),
			new Leaf("Coffee Machines", []),
			new Leaf("Juicers", []),
			new Leaf("Popcorn Makers", []),
			new Leaf("Tea Kettles", []),
			new Leaf("Water Heaters", []),
			new Leaf("Waffle Makers", []),
			new Leaf("Other Appliances", []),
		],
		Cookware: [
			new Leaf("Pots", []),
			new Leaf("Pans", []),
			new Leaf("Forms", []),
			new Leaf("Other Cookware", []),
		],
		Cutlery: [
			new Leaf("Knives", []),
			new Leaf("Forks", []),
			new Leaf("Tea Spoons", []),
			new Leaf("Soup Spoons", []),
			new Leaf("Chop Sticks", []),
			new Leaf("Other Cutlery", []),
		],
		Dishes: [
			new Leaf("Plates", []),
			new Leaf("Mugs", []),
			new Leaf("Bowls", []),
			new Leaf("Cups", []),
			new Leaf("Platters", []),
			new Leaf("Trays", ["EnergyEfficiencyClass"]),
			new Leaf("Tea Pots", []),
			new Leaf("Other Dishes", []),
		],
		OtherKitchenCategories: [new Leaf("Other Kitchen Categories", [])],
	},
};

export const details = {
	Brands: [
		"Melitta",
		"WMF",
		"Krups",
		"Philips",
		"Severin",
		"AEG",
		"DeLonghi",
		"Siemens",
		"Miele",
		"Nespresso",
		"Tefal",
		"Tchibo",
		"Bialetti",
		"Bosch",
		"Kenwood",
		"Bodum",
		"Gaggia",
		"Bauknecht",
		"BEKO",
		"Zwilling",
		"Clatronic",
		"Gorenje",
		"Grundig",
		"Other",
		"Ikea",
		"Liebherr",
		"ok",
		"Privileg",
		"Russell Hobbs",
		"KPM",
	],
	Conditions: ["*****", "****", "***", "**", "*"],
	Age: [
		"Less than a month",
		"Less than a year",
		"Less than five years",
		"More than five years",
	],
	EnergyEfficiencyClass: [
		"A+++",
		"A++",
		"A+",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
	],
};

const { leafPathMap, leafDetailsMap } = generatePathLeafPairs(ontology).reduce(
	//@ts-ignore
	(accum, pair) => {
		const [path, leaf] = pair;

		accum["leafPathMap"][leaf.label] = path;
		accum["leafDetailsMap"][leaf.label] = leaf.details;

		return accum;
	},
	{ leafPathMap: {}, leafDetailsMap: {} }
);

console.log("Path to 'Trays': ", leafPathMap["Trays"]); // test if it works

const detailsModelMap = {
	// add Zod models for each possible detail here
	EnergyEfficiencyClass: z.string(),
};

//@ts-ignore
const modelDict = Object.entries(leafDetailsMap).reduce((accum, pair) => {
	const [label, details] = pair;
	const model = {};
	//@ts-ignore
	for (const detail of details) {
		//@ts-ignore
		model[detail] = detailsModelMap[detail];
	}

	//@ts-ignore
	accum[label] = z.Object(model);
	return accum;
}, {});

//@ts-ignore
console.log("Model for 'Trays': ", modelDict["Trays"]); // test if it works

// To-Do List
// - fill out details required for each leaf category in 'ontology'
// - fill out 'detailsModelMap'
