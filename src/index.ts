#!/usr/bin/env node

import { Inventory } from "./inventory/inventory";
import { Product } from "./products/product";

// create a few products
const x = new Product("First product", 25.43);
const y = new Product("Second product", 23.67);

// create Inventory and add the created products with a specified quantity
const inventory = new Inventory();
inventory.add(x, 17);
inventory.add(y, 146);

// print inventory to the console
console.log(inventory.printList());
