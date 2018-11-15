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
    return Product;
}());
exports.Product = Product;
