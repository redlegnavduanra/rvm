"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.products = [];
    }
    // add the product to the inventory
    Inventory.prototype.add = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        if (this.products.find(function (prd) { return prd[0].name === product.name; })) {
            return;
        }
        this.products.push([product, quantity]);
    };
    // render a nice output to the console
    Inventory.prototype.printList = function () {
        var result = "\n*********************************************************************************************************\n*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tQuantity\t*\n*-------------------------------------------------------------------------------------------------------*\n";
        this.products.forEach(function (product, idx) {
            var prodNameTabs = 4 - product[0].name.length / 8;
            var tabs = "";
            for (var i = 0; i < prodNameTabs; i++) {
                tabs += "\t";
            }
            result += "*\t" + idx + "\t|\t" + product[0].name + tabs + "|\t\u20AC " + product[0].price + "\t\t|\t" + product[1] + "\t\t*\n";
        });
        result += "*********************************************************************************************************";
        return result;
    };
    return Inventory;
}());
exports.Inventory = Inventory;
