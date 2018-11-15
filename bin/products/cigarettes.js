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
var CigarreteType;
(function (CigarreteType) {
    CigarreteType[CigarreteType["Camel"] = 0] = "Camel";
    CigarreteType[CigarreteType["Davidoff"] = 1] = "Davidoff";
    CigarreteType[CigarreteType["Kent"] = 2] = "Kent";
    CigarreteType[CigarreteType["Marlboro"] = 3] = "Marlboro";
})(CigarreteType = exports.CigarreteType || (exports.CigarreteType = {}));
var Cigarrete = /** @class */ (function (_super) {
    __extends(Cigarrete, _super);
    function Cigarrete(_name, _price, _brand) {
        var _this = _super.call(this, _name, _price) || this;
        _this._name = _name;
        _this._price = _price;
        _this._brand = _brand;
        return _this;
    }
    Object.defineProperty(Cigarrete.prototype, "brand", {
        get: function () {
            return this._brand;
        },
        enumerable: true,
        configurable: true
    });
    // render a nice output to the console
    Cigarrete.prototype.toString = function () {
        return "Name: " + this.name + "; Price: " + this.price + "; Brand: " + this.brand;
    };
    return Cigarrete;
}(product_1.Product));
exports.Cigarrete = Cigarrete;
