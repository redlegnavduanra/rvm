#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory/inventory");
var general_1 = require("./general");
var products_1 = require("./products");
var medicine_1 = require("./products/medicine");
// create a few products
var marlboroCigarette = new products_1.Cigarrete("Marlboro cigarettes", 25.43, products_1.CigarreteBrand.Marlboro);
var davidoffCigarette = new products_1.Cigarrete("Davidoff cigarettes", 23.67, products_1.CigarreteBrand.Davidoff, products_1.CigarreteType.Light, 36);
var winegumes = new products_1.Snack("PretMix", 2.34, products_1.SnackCategory.Candy, products_1.SnackType.Fruitgom, products_1.SnackBrand.RedBand, new general_1.Energy(56, general_1.UnitOfMeasurement.Calorie));
var bandAid = new products_1.Medicine("Hansaplast BandAid", 1.25, medicine_1.MedicineType.BandAid, [
    medicine_1.Illness.Wound
]);
// create Inventory and add the created products with a specified quantity
var inventory = new inventory_1.Inventory();
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
