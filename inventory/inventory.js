"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.products = [];
    }
    Inventory.prototype.add = function (product) {
        if (this.products.find(function (itm) { return itm.id === product.id; })) {
            return;
        }
        this.products.push(product);
    };
    Inventory.prototype.getList = function () { };
    Inventory.prototype.toString = function () {
        var result = "\n*********************************************************************************************************\n*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\t# in Stock\t*\n*-------------------------------------------------------------------------------------------------------*\n";
        this.products.forEach(function (product) {
            result += "*\t" + product.id + "\t|\t" + product.name + "\t\t\t|\t\u20AC " + product.price + "\t\t|\t3\t\t*\n";
        });
        result += "*********************************************************************************************************";
        return result;
    };
    return Inventory;
}());
exports.Inventory = Inventory;
