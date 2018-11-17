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
import { Cigarette, Medicine, Snack, Beverage } from "./products";
import { CashRegister } from "./cashregister";
import { CLI } from "./ui/cli";

export class Main {
    private cashRegister: CashRegister;

    constructor() {
        // initialize the application logic
        this.cashRegister = new CashRegister(new Inventory(16, 8));

        // initialize some products for the in-memory database
        //  this.createProducts();

        // startup cli
        new CLI(this.cashRegister);
    }

    createProducts() {
        this.cashRegister.inventory.add(
            new Cigarette("Marlboro cigarettes", 25.43, Brand.Marlboro),
            8
        );

        this.cashRegister.inventory.add(
            new Cigarette(
                "Davidoff cigarettes",
                23.67,
                Brand.Davidoff,
                CigarreteType.Light,
                new Quantity(36, UnitOfMeasurement.Unit)
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Medicine(
                "Hansaplast BandAid",
                1.25,
                Brand.Hansaplast,
                MedicineType.BandAid,
                [Illness.Wound]
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Medicine(
                "Paracetamol",
                2.97,
                Brand.Bayer,
                MedicineType.Paracetamol,
                [Illness.Earache, Illness.Migraine, Illness.Fever]
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Snack(
                "PretMix",
                2.34,
                SnackCategory.Candy,
                Brand.RedBand,
                SnackType.Fruitgom,
                new Quantity(56, UnitOfMeasurement.Calorie)
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Snack(
                "Mars",
                2.34,
                SnackCategory.ChocoloteBar,
                Brand.Mars,
                SnackType.Mars,
                new Quantity(157, UnitOfMeasurement.Calorie)
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Snack(
                "Snickers",
                2.34,
                SnackCategory.ChocoloteBar,
                Brand.Mars,
                SnackType.Snickers,
                new Quantity(238, UnitOfMeasurement.Calorie)
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Coca Cola",
                1.0,
                Brand.CocaCola,
                new Quantity(33, UnitOfMeasurement.CentiLiter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Fanta",
                1.5,
                Brand.CocaCola,
                new Quantity(33, UnitOfMeasurement.CentiLiter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Tropicana",
                2.5,
                Brand.PepsiCo,
                new Quantity(0.5, UnitOfMeasurement.Liter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "7Up",
                1.8,
                Brand.PepsiCo,
                new Quantity(0.33, UnitOfMeasurement.CentiLiter),
                true
            ),
            8
        );
    }
}

new Main();
