import { z } from "zod";

export const Brands = z.enum([
  "Melitta",
  "WMF",
  "Krupps",
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
]);

export const Conditions = z.enum(["*****", "****", "***", "**", "*"]);

export const Age = z.enum([
  "Less than a month",
  "Less than a year",
  "Less than five years",
  "More than five years",
]);

export const GlobalDetails = z.object({
  Conditon: Conditions,
  Age: Age,
  Brand: Brands,
});

// details useable on electronic appliances

export const EnergyEfficiencyClass = z.enum([
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
]);

export const ElectronicDetails = GlobalDetails.extend({
  "Energy Efficiency Class": EnergyEfficiencyClass,
});

// details for the coffee machine subcategory

export const CoffeeMachineTypes = z.enum([
  "French Press",
  "Mokka Pot",
  "Espresso",
  "Automatic",
  "Filter",
  "Capsule",
  "Other",
]);

export const CoffeeMachineDetails = ElectronicDetails.extend({
  CoffeeMachineType: CoffeeMachineTypes,
});
