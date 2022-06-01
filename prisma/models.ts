import { string, z } from "zod";
import {
  Age,
  AllSubCategories,
  Brands,
  Conditions,
  Dishes,
  EnergyEfficiencyClass,
  subcategories,
} from "./enums/global";

// one tabe for every top level category
// for now only kitchen

const CoffeeMachineItem = z.object({
  title: z.string(),
  images: z.array(z.string()),
  description: z.string().optional(),
  details: z.object({
    Brand: Brands,
    Age: Age,
    Condition: Conditions,
    EnergyEfficiencyClass: EnergyEfficiencyClass,
  }),
  subcategory: AllSubCategories,
});

// next steps:
// Create a post request for the coffee machine item
// create a get request for the coffee machine subcategory

// One object with all of the pieces (Zod enums and categories)
// One object with keys and nesting structure describes how to construct a specific item model
// A function that parses the above object and outputs a single-level object with all of the constructed item models keyed by subcategory

// Details that are useable on every item

//   type   String?
//   Brand String?
//   Colors  String[]
//   Manual String?
//   Dimensions Float[]
//   Material String?

// export const CreateUserModel = Type.Object({
//   email: Type.String({ format: "email" }),
//   firstName: Type.String({ minLength: 2 }),
//   lastName: Type.String({ minLength: 2 }),
//   passwordHash: Type.String(),
//   passwordSalt: Type.String(),
// });
