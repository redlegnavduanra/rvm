"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(_name, _price) {
        this._name = _name;
        this._price = _price;
    }
    Object.defineProperty(Product.prototype, "name", {
        /* Getters and Setters */
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (price) {
            this._price = price;
        },
        enumerable: true,
        configurable: true
    });
    // render a nice output to the console
    Product.prototype.toString = function () {
        return "Name: " + this.name + "; Price: " + this.price;
    };
    return Product;
}());
exports.Product = Product;
