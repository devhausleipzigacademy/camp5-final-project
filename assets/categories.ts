import { generatePathLeafPairs } from "../utils/lazyFlatten";
import { z, ZodObjectDef } from "zod";

type Leaf = [string, Array<string>];

type OntologyPlaceholder<T> = Record<string, Array<Leaf> | T>;
interface Ontology extends OntologyPlaceholder<Ontology> {}

const ontology: Ontology = {
  Kitchen: {
    Appliances: [
      ["Toasters", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      ["Blenders", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      [
        "Coffee Machines",
        ["Age", "Condition", "Brand", "EnergyEfficiencyClass"],
      ],
      ["Juicers", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      [
        "Popcorn Makers",
        ["Age", "Condition", "Brand", "EnergyEfficiencyClass"],
      ],
      ["Tea Kettles", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      ["Water Heaters", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      ["Waffle Makers", ["Age", "Condition", "Brand", "EnergyEfficiencyClass"]],
      [
        "Other Appliances",
        ["Age", "Condition", "Brand", "EnergyEfficiencyClass"],
      ],
    ],
    Cookware: [
      ["Pots", ["Age", "Condition", "Brand", "Material"]],
      ["Pans", ["Age", "Condition", "Brand", "Material"]],
      ["Forms", ["Age", "Condition", "Brand", "Material"]],
      ["Other Cookware", ["Age", "Condition", "Brand", "Material"]],
    ],
    Cutlery: [
      ["Knives", ["Age", "Condition", "Brand", "Material"]],
      ["Forks", ["Age", "Condition", "Brand", "Material"]],
      ["Tea Spoons", ["Age", "Condition", "Brand", "Material"]],
      ["Soup Spoons", ["Age", "Condition", "Brand", "Material"]],
      ["Chop Sticks", ["Age", "Condition", "Brand", "Material"]],
      ["Other Cutlery", ["Age", "Condition", "Brand", "Material"]],
    ],
    Dishes: [
      ["Plates", ["Age", "Condition", "Brand", "Material"]],
      ["Mugs", ["Age", "Condition", "Brand", "Material"]],
      ["Bowls", ["Age", "Condition", "Brand", "Material"]],
      ["Cups", ["Age", "Condition", "Brand", "Material"]],
      ["Platters", ["Age", "Condition", "Brand", "Material"]],
      ["Trays", ["Age", "Condition", "Brand", "Material"]],
      ["Tea Pots", ["Age", "Condition", "Brand", "Material"]],
      ["Other Dishes", ["Age", "Condition", "Brand", "Material"]],
    ],
    OtherKitchenCategories: [["Other Kitchen Categories", []]],
    FirstTestCategory: {
      TestNest1: {
        TestNest2: {
          TestNest3: [["First Test Class", []]],
        },
      },
    },
    SecondTestCategory: {
      NestTest1: {
        NestTest2: {
          NestTest3: [["Second Test Class", []]],
        },
      },
    },
  },
};

type Details =
  | "Age"
  | "Condition"
  | "Brand"
  | "EnergyEfficiencyClass"
  | "Material";

export const details: Record<Details, string[]> = {
  Material: [
    "Stainless Steel",
    "Synthetic",
    "Silver",
    "Ceramic",
    "Porcelain",
    "Wood",
    "Glass",
  ],
  Brand: [
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
  Condition: ["*****", "****", "***", "**", "*"],
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

type Leaves = Array<string>;
type LeafDetailsMap = Record<Leaves[number], Array<keyof typeof details>>;
type LeafPathMap = Record<Leaves[number], Array<string>>;

const output: {
  leafPathMap: LeafPathMap;
  leafDetailsMap: LeafDetailsMap;
  leaves: Leaves;
} = [...generatePathLeafPairs(ontology)].reduce(
  //@ts-ignore
  (accum, pair) => {
    const [path, leaf] = pair;
    const [label, details] = leaf;
    accum["leafPathMap"][label] = path;
    accum["leafDetailsMap"][label] = details;
    accum["leaves"].push(label);

    return accum;
  },
  { leafPathMap: {}, leafDetailsMap: {}, leaves: [] }
);

export const { leafPathMap, leafDetailsMap, leaves } = output;

type ZodIsDumb = [string, ...string[]];

export const detailsModelMap = {
  // add Zod models for each possible detail here
  EnergyEfficiencyClass: z
    .enum(details.EnergyEfficiencyClass as ZodIsDumb)
    .optional(),
  Age: z.enum(details.Age as ZodIsDumb).optional(),
  Condition: z.enum(details.Condition as ZodIsDumb).optional(),
  Brand: z.enum(details.Brand as ZodIsDumb).optional(),
  Material: z.enum(details.Material as ZodIsDumb).optional(),
};

export const modelDict: Record<string, ZodObjectDef> = Object.entries(
  leafDetailsMap
).reduce((accum, pair) => {
  const [label, details]: [string, Array<Details>] = pair;
  const model = {};
  for (const detail of details) {
    //@ts-ignore
    model[detail] = detailsModelMap[detail];
  }

  //@ts-ignore
  accum[label] = z.object(model).strict();
  return accum;
}, {});
