"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./product");
var Snack = /** @class */ (function (_super) {
    __extends(Snack, _super);
    function Snack(_name, _price, _category, _brand, _type, _energy) {
        var _this = _super.call(this, _name, _price, _brand) || this;
        _this._name = _name;
        _this._price = _price;
        _this._category = _category;
        _this._brand = _brand;
        _this._type = _type;
        _this._energy = _energy;
        return _this;
    }
    Object.defineProperty(Snack.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (category) {
            this._category = category;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snack.prototype, "energy", {
        get: function () {
            return this._energy;
        },
        set: function (energy) {
            this._energy = energy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snack.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Snack.prototype.toString = function () {
        return "\n\n*****************************************************************\n*\t\t\tSnack\t\t\t\t\t*\n*****************************************************************\n\tName: " + this.name + "\n        \n\tPrice: " + this.price.toFixed(2) + "\n\tBrand: " + this.brand + "\n\tCategory: " + this.category + "\n\tType: " + this.type + "\n\tEnergy: " + this.energy + "\n*****************************************************************";
        //     `Name: ${this.name}; Price: ${this.price}; Category: ${
        //     this.category
        // }; Type: ${this.type}; Brand: ${this.brand}; Energy: ${this.energy}`;
    };
    return Snack;
}(product_1.Product));
exports.Snack = Snack;
