#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inventory_1 = require("./inventory/inventory");
var product_1 = require("./products/product");
// create a few products
var x = new product_1.Product("First product", 25.43);
var y = new product_1.Product("Second product", 23.67);
// create Inventory and add the created products with a specified quantity
var inventory = new inventory_1.Inventory();
inventory.add(x, 439);
inventory.add(y, 257);
// print inventory to the console
console.log(inventory.printList());
