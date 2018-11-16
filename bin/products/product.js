"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(_name, _price, _brand) {
        this._name = _name;
        this._price = _price;
        this._brand = _brand;
    }
    Object.defineProperty(Product.prototype, "brand", {
        /* Getters and Setters */
        get: function () {
            return this._brand;
        },
        set: function (brand) {
            this._brand = brand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "name", {
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
