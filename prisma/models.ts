import { string, z } from "zod";
import {
  Age,
  AllSubCategories,
  Brands,
  Conditions,
  Dishes,
  EnergyEfficiencyClass,
  SellType,
} from "./enums/global";

// one table for every top level category
// for now only kitchen

export const CoffeeMachineItem = z.object({
  title: z.string(),
  images: z.object({}),
  description: z.string().optional(),
  sellType: SellType,
  details: z
    .object({
      Brand: Brands.optional(),
      Age: Age.optional(),
      Condition: Conditions.optional(),
      EnergyEfficiencyClass: EnergyEfficiencyClass.optional(),
    })
    .optional(),
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
