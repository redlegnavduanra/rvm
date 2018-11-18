#!/usr/bin/env node

import { Inventory } from "./inventory/inventory";
import { CashRegister } from "./cashregister";
import { CLI } from "./ui/cli";

export class Main {
    private cashRegister: CashRegister;

    constructor() {
        // initialize the application logic
        this.cashRegister = new CashRegister(new Inventory(16, 8));

        // startup cli
        new CLI(this.cashRegister);
    }
}

new Main();
