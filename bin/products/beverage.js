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
var Beverage = /** @class */ (function (_super) {
    __extends(Beverage, _super);
    function Beverage(_name, _price, _brand, _volume, _isCooled) {
        var _this = _super.call(this, _name, _price, _brand) || this;
        _this._name = _name;
        _this._price = _price;
        _this._brand = _brand;
        _this._volume = _volume;
        _this._isCooled = _isCooled;
        return _this;
    }
    Object.defineProperty(Beverage.prototype, "isCooled", {
        get: function () {
            return this._isCooled;
        },
        set: function (isCooled) {
            this._isCooled = isCooled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Beverage.prototype, "volume", {
        get: function () {
            return this._volume;
        },
        set: function (volume) {
            this._volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    Beverage.prototype.toString = function () {
        return "Name: " + this.name + "; Price: " + this.price + "; Brand: " + this.brand + "; Volume: " + this.volume + "; Cooled: " + this.isCooled;
    };
    return Beverage;
}(product_1.Product));
exports.Beverage = Beverage;
