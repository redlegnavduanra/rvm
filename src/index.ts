#!/usr/bin/env node

import { Inventory } from "./inventory/inventory";
import {
    Brand,
    CigarreteType,
    Illness,
    Quantity,
    MedicineType,
    SnackType,
    SnackCategory,
    UnitOfMeasurement
} from "./general";
import { Cigarrete, Medicine, Snack, Beverage } from "./products";

export class Main {
    private inventory: Inventory;

    constructor() {
        this.inventory = new Inventory(25, 30);
    }

    createProducts() {
        this.inventory.add(
            new Cigarrete("Marlboro cigarettes", 25.43, Brand.Marlboro),
            150
        );

        this.inventory.add(
            new Cigarrete(
                "Davidoff cigarettes",
                23.67,
                Brand.Davidoff,
                CigarreteType.Light,
                new Quantity(36, UnitOfMeasurement.Unit)
            ),
            57
        );

        this.inventory.add(
            new Snack(
                "PretMix",
                2.34,
                SnackCategory.Candy,
                Brand.RedBand,
                SnackType.Fruitgom,
                new Quantity(56, UnitOfMeasurement.Calorie)
            ),
            40
        );

        this.inventory.add(
            new Medicine(
                "Hansaplast BandAid",
                1.25,
                Brand.Hansaplast,
                MedicineType.BandAid,
                [Illness.Wound]
            ),
            30
        );

        this.inventory.add(
            new Snack(
                "PretMix",
                2.34,
                SnackCategory.Candy,
                Brand.RedBand,
                SnackType.Fruitgom,
                new Quantity(56, UnitOfMeasurement.Calorie)
            ),
            3
        );

        this.inventory.add(
            new Beverage(
                "Coca Cola",
                1.0,
                Brand.CocaCola,
                new Quantity(33, UnitOfMeasurement.CentiLiter),
                true
            ),
            16
        );

        this.inventory.add(
            new Snack(
                "PretMix",
                2.34,
                SnackCategory.Candy,
                Brand.RedBand,
                SnackType.Fruitgom,
                new Quantity(56, UnitOfMeasurement.Calorie)
            ),
            3
        );
    }

    printList() {
        console.log(this.inventory.toString());
    }

    printItems() {
        console.log(this.inventory.printItems());
    }

    printItem(id: number) {
        try {
            console.log(this.inventory.printItem(id));
        } catch (error) {
            console.error(error.message);
        }
    }
}

const main = new Main();
main.createProducts();
main.printList();
main.printItems();
