"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.products = [];
    }
    // add the product to the inventory
    Inventory.prototype.add = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        if (this.products.find(function (prd) { return prd[0].id === product.id; })) {
            return;
        }
        this.products.push([product, quantity]);
    };
    // render a nice output to the console
    Inventory.prototype.printList = function () {
        var result = "\n*********************************************************************************************************\n*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tQuantity\t*\n*-------------------------------------------------------------------------------------------------------*\n";
        this.products.forEach(function (product) {
            result += "*\t" + product[0].id + "\t|\t" + product[0].name + "\t\t\t|\t\u20AC " + product[0].price + "\t\t|\t" + product[1] + "\t\t*\n";
        });
        result += "*********************************************************************************************************";
        return result;
    };
    return Inventory;
}());
exports.Inventory = Inventory;
