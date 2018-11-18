#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory/inventory");
var cashregister_1 = require("./cashregister");
var cli_1 = require("./ui/cli");
var Main = /** @class */ (function () {
    function Main() {
        // initialize the application logic
        this.cashRegister = new cashregister_1.CashRegister(new inventory_1.Inventory(16, 8));
        // startup cli
        new cli_1.CLI(this.cashRegister);
    }
    return Main;
}());
exports.Main = Main;
new Main();
