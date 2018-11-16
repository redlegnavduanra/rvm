#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory/inventory");
var general_1 = require("./general");
var products_1 = require("./products");
var Main = /** @class */ (function () {
    function Main() {
        this.inventory = new inventory_1.Inventory(25, 30);
    }
    Main.prototype.createProducts = function () {
        this.inventory.add(new products_1.Cigarrete("Marlboro cigarettes", 25.43, general_1.Brand.Marlboro), 150);
        this.inventory.add(new products_1.Cigarrete("Davidoff cigarettes", 23.67, general_1.Brand.Davidoff, general_1.CigarreteType.Light, new general_1.Quantity(36, general_1.UnitOfMeasurement.Unit)), 57);
        this.inventory.add(new products_1.Snack("PretMix", 2.34, general_1.SnackCategory.Candy, general_1.Brand.RedBand, general_1.SnackType.Fruitgom, new general_1.Quantity(56, general_1.UnitOfMeasurement.Calorie)), 40);
        this.inventory.add(new products_1.Medicine("Hansaplast BandAid", 1.25, general_1.Brand.Hansaplast, general_1.MedicineType.BandAid, [general_1.Illness.Wound]), 30);
        this.inventory.add(new products_1.Snack("PretMix", 2.34, general_1.SnackCategory.Candy, general_1.Brand.RedBand, general_1.SnackType.Fruitgom, new general_1.Quantity(56, general_1.UnitOfMeasurement.Calorie)), 3);
        this.inventory.add(new products_1.Beverage("Coca Cola", 1.0, general_1.Brand.CocaCola, new general_1.Quantity(33, general_1.UnitOfMeasurement.CentiLiter), true), 16);
        this.inventory.add(new products_1.Snack("PretMix", 2.34, general_1.SnackCategory.Candy, general_1.Brand.RedBand, general_1.SnackType.Fruitgom, new general_1.Quantity(56, general_1.UnitOfMeasurement.Calorie)), 3);
    };
    Main.prototype.printList = function () {
        console.log(this.inventory.toString());
    };
    Main.prototype.printItems = function () {
        console.log(this.inventory.printItems());
    };
    Main.prototype.printItem = function (id) {
        try {
            console.log(this.inventory.printItem(id));
        }
        catch (error) {
            console.error(error.message);
        }
    };
    return Main;
}());
exports.Main = Main;
var main = new Main();
main.createProducts();
main.printList();
main.printItems();
