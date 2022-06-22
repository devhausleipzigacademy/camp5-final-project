import { generatePathLeafPairs } from "../utils/lazyFlatten";
import { z, ZodObjectDef } from "zod";
import { ontology, details } from "./metadata";

type Leaves = Array<string>;
type LeafDetailsMap = Record<Leaves[number], Array<string>>;
type LeafPathMap = Record<Leaves[number], Array<string>>;

const output: {
  leafPathMap: LeafPathMap;
  leafDetailsMap: LeafDetailsMap;
  leaves: Leaves;
} = [...generatePathLeafPairs(ontology)].reduce(
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

export const detailsModelMap = {
  // add Zod models for each possible detail here
  EnergyEfficiencyClass: z.enum(details.EnergyEfficiencyClass).optional(),
  Age: z.enum(details.Age).optional(),
  Condition: z.enum(details.Condition).optional(),
  Brand: z.enum(details.Brand).optional(),
  Material: z.enum(details.Material).optional(),
};

export const modelDict: Record<Leaves[number], ZodObjectDef> = Object.entries(
  leafDetailsMap
).reduce((accum, pair) => {
  const [label, details]: [string, Array<string>] = pair;
  const model = {};
  for (const detail of details) {
    //@ts-ignore
    model[detail] = detailsModelMap[detail];
  }

  //@ts-ignore
  accum[label] = z.object(model).strict();
  return accum;
}, {});
