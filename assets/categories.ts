import { generatePathLeafPairs } from "../utils/lazyFlatten";

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
      new Leaf("Trays", []),
      new Leaf("Tea Pots", []),
      new Leaf("Other Dishes", []),
    ],
    OtherKitchenCategories: [new Leaf("Other Kitchen Categories", [])],
  },
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
  Trays: {}, // add Zod models here
};
