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
var general_1 = require("./../general");
var Cigarette = /** @class */ (function (_super) {
    __extends(Cigarette, _super);
    function Cigarette(_name, _price, _brand, _type, _volume) {
        if (_type === void 0) { _type = general_1.CigarreteType.Normal; }
        if (_volume === void 0) { _volume = new general_1.Quantity(12, general_1.UnitOfMeasurement.Unit); }
        var _this = _super.call(this, _name, _price, _brand) || this;
        _this._name = _name;
        _this._price = _price;
        _this._brand = _brand;
        _this._type = _type;
        _this._volume = _volume;
        return _this;
    }
    Object.defineProperty(Cigarette.prototype, "brand", {
        get: function () {
            return this._brand;
        },
        set: function (brand) {
            this._brand = brand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cigarette.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cigarette.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (volume) {
            this._volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    // render a nice output to the console
    Cigarette.prototype.toString = function () {
        return "\n\n*****************************************************************\n*\t\t\tCigarettes\t\t\t\t*\n*****************************************************************\n\tName: " + this.name + "\tType: " + this.type + "\n        \n\tPrice: " + this.price.toFixed(2) + "\n\tBrand: " + this.brand + "\n\tVolume: " + this.volume + "\n*****************************************************************";
    };
    return Cigarette;
}(product_1.Product));
exports.Cigarette = Cigarette;
