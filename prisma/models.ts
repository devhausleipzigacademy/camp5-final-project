import { string, z } from "zod";

// one tabe for every top level category
// for now only kitchen

const KitchenCategories = z.enum([
  "Appliances",
  "Cookware",
  "Cutlery",
  "Dishes",
  "Other Kitchen Categories",
]);

const Appliances = z.enum([
  "Toasters",
  "Blenders",
  "Coffee Machines",
  "Juicers",
  "Popcorn Makers",
  "Tea Kettles",
  "Water Heaters",
  "Waffle Makers",
  "Other Appliances",
]);

const Cutlery = z.enum([
  "Knives",
  "Forks",
  "Tea Spoons",
  "Soup Spoons",
  "Chop Sticks",
  "Other Cutlery",
]);
const Cookware = z.enum(["Pots", "Pans", "Forms", "Other Cookware"]);
const Dishes = z.enum([
  "Plates",
  "Mugs",
  "Bowls",
  "Cups",
  "Platters",
  "Trays",
  "Tea Pots",
  "Other Dishes",
]);

const subcategories = z.object({
  dishes: Dishes,
  cutlery: Cutlery,
  appliances: Appliances,
  cookware: Cookware,
});

const CoffeeMachineItem = z
  .object({
    title: z.string(),
    images: z.array(z.string()),
    description: z.string().optional(),
    details: z.object({}).optional(),
    subcategory: subcategories,
  })
  .refine((data) => data.subcategory.appliances === "Coffee Machines");

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
