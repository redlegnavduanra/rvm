#!/usr/bin/env node

import { Inventory } from "./inventory/inventory";
import { Energy, UnitOfMeasurement } from "./general";
import {
    Cigarrete,
    CigarreteBrand,
    CigarreteType,
    Medicine,
    Snack,
    SnackType,
    SnackBrand,
    SnackCategory
} from "./products";
import { MedicineType, Illness } from "./products/medicine";

// create a few products
const marlboroCigarette = new Cigarrete(
    "Marlboro cigarettes",
    25.43,
    CigarreteBrand.Marlboro
);

const davidoffCigarette = new Cigarrete(
    "Davidoff cigarettes",
    23.67,
    CigarreteBrand.Davidoff,
    CigarreteType.Light,
    36
);

const winegumes = new Snack(
    "PretMix",
    2.34,
    SnackCategory.Candy,
    SnackType.Fruitgom,
    SnackBrand.RedBand,
    new Energy(56, UnitOfMeasurement.Calorie)
);

const bandAid = new Medicine("Hansaplast BandAid", 1.25, MedicineType.BandAid, [
    Illness.Wound
]);

// create Inventory and add the created products with a specified quantity
const inventory = new Inventory();
inventory.add(marlboroCigarette, 439);
inventory.add(davidoffCigarette, 257);
inventory.add(winegumes, 100);
inventory.add(bandAid, 30);

// print inventory to the console
console.log(inventory.printList());
console.log(marlboroCigarette.toString());
console.log(davidoffCigarette.toString());
console.log(winegumes.toString());
console.log(bandAid.toString());
