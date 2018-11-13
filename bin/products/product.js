"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(_name, _price) {
        this._name = _name;
        this._price = _price;
        this._id = Product.id;
        Product.id++;
    }
    Object.defineProperty(Product.prototype, "id", {
        /* Getters and Setters */
        get: function () {
            return this._id;
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
    // render a nice output to the console
    Product.prototype.toString = function () {
        return "\nid: " + this.id + "; Name: " + this.name + "; Price: " + this.price;
    };
    // static id for generating unique id's
    // should be a GUID e.g. in real production code
    Product.id = 0;
    return Product;
}());
exports.Product = Product;
