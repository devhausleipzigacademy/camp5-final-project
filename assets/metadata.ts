export type Leaf<T, P> = [T, Array<P>];

type OntologyPlaceholder<T, P, X> = Record<string, Array<Leaf<P, X>> | T>;
export interface Ontology<P, X>
  extends OntologyPlaceholder<Ontology<P, X>, P, X> {}

export const details = {
  Material: [
    "Stainless Steel",
    "Synthetic",
    "Silver",
    "Ceramic",
    "Porcelain",
    "Wood",
    "Glass",
  ] as const,
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
    "Privileg",
    "Russell Hobbs",
    "KPM",
  ] as const,
  Condition: ["*****", "****", "***", "**", "*"] as const,
  Age: [
    "Less than a month",
    "Less than a year",
    "Less than five years",
    "More than five years",
  ] as const,
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
  ] as const,
};

// how to make this more type safe WITHOUT explicitly listing a union of all class labels?
export type Classes = string;

export const ontology: Ontology<Classes, keyof typeof details> = {
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
    // OtherKitchenCategories: [["Other Kitchen Categories", []]],
    // FirstTestCategory: {
    //   TestNest1: {
    //     TestNest2: {
    //       TestNest3: [["First Test Class", []]],
    //     },
    //   },
    // },
    // SecondTestCategory: {
    //   NestTest1: {
    //     NestTest2: {
    //       NestTest3: [["Second Test Class", []]],
    //     },
    //   },
    // },
  },
};
