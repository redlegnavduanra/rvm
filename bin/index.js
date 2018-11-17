#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory/inventory");
var general_1 = require("./general");
var products_1 = require("./products");
var cashregister_1 = require("./cashregister");
var cli_1 = require("./ui/cli");
var Main = /** @class */ (function () {
    function Main() {
        // initialize the application logic
        this.cashRegister = new cashregister_1.CashRegister(new inventory_1.Inventory(16, 8));
        // initialize some products for the in-memory database
        //  this.createProducts();
        // startup cli
        new cli_1.CLI(this.cashRegister);
    }
    Main.prototype.createProducts = function () {
        this.cashRegister.inventory.add(new products_1.Cigarette("Marlboro cigarettes", 25.43, general_1.Brand.Marlboro), 8);
        this.cashRegister.inventory.add(new products_1.Cigarette("Davidoff cigarettes", 23.67, general_1.Brand.Davidoff, general_1.CigarreteType.Light, new general_1.Quantity(36, general_1.UnitOfMeasurement.Unit)), 8);
        this.cashRegister.inventory.add(new products_1.Medicine("Hansaplast BandAid", 1.25, general_1.Brand.Hansaplast, general_1.MedicineType.BandAid, [general_1.Illness.Wound]), 8);
        this.cashRegister.inventory.add(new products_1.Medicine("Paracetamol", 2.97, general_1.Brand.Bayer, general_1.MedicineType.Paracetamol, [general_1.Illness.Earache, general_1.Illness.Migraine, general_1.Illness.Fever]), 8);
        this.cashRegister.inventory.add(new products_1.Snack("PretMix", 2.34, general_1.SnackCategory.Candy, general_1.Brand.RedBand, general_1.SnackType.Fruitgom, new general_1.Quantity(56, general_1.UnitOfMeasurement.Calorie)), 16);
        this.cashRegister.inventory.add(new products_1.Snack("Mars", 2.34, general_1.SnackCategory.ChocoloteBar, general_1.Brand.Mars, general_1.SnackType.Mars, new general_1.Quantity(157, general_1.UnitOfMeasurement.Calorie)), 8);
        this.cashRegister.inventory.add(new products_1.Snack("Snickers", 2.34, general_1.SnackCategory.ChocoloteBar, general_1.Brand.Mars, general_1.SnackType.Snickers, new general_1.Quantity(238, general_1.UnitOfMeasurement.Calorie)), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Coca Cola", 1.0, general_1.Brand.CocaCola, new general_1.Quantity(33, general_1.UnitOfMeasurement.CentiLiter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Fanta", 1.5, general_1.Brand.CocaCola, new general_1.Quantity(33, general_1.UnitOfMeasurement.CentiLiter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Tropicana", 2.5, general_1.Brand.PepsiCo, new general_1.Quantity(0.5, general_1.UnitOfMeasurement.Liter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("7Up", 1.8, general_1.Brand.PepsiCo, new general_1.Quantity(0.33, general_1.UnitOfMeasurement.CentiLiter), true), 8);
    };
    return Main;
}());
exports.Main = Main;
new Main();
