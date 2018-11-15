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
var CigarreteBrand;
(function (CigarreteBrand) {
    CigarreteBrand["Camel"] = "Camel";
    CigarreteBrand["Davidoff"] = "Davidoff";
    CigarreteBrand["Kent"] = "Kent";
    CigarreteBrand["Marlboro"] = "Marlboro";
})(CigarreteBrand = exports.CigarreteBrand || (exports.CigarreteBrand = {}));
var CigarreteType;
(function (CigarreteType) {
    CigarreteType["Light"] = "Light";
    CigarreteType["Menthol"] = "Menthol";
    CigarreteType["Normal"] = "Normal";
})(CigarreteType = exports.CigarreteType || (exports.CigarreteType = {}));
var Cigarrete = /** @class */ (function (_super) {
    __extends(Cigarrete, _super);
    function Cigarrete(_name, _price, _brand, _type, _volume) {
        if (_type === void 0) { _type = CigarreteType.Normal; }
        if (_volume === void 0) { _volume = 12; }
        var _this = _super.call(this, _name, _price) || this;
        _this._name = _name;
        _this._price = _price;
        _this._brand = _brand;
        _this._type = _type;
        _this._volume = _volume;
        return _this;
    }
    Object.defineProperty(Cigarrete.prototype, "brand", {
        get: function () {
            return this._brand;
        },
        set: function (brand) {
            this._brand = brand;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cigarrete.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cigarrete.prototype, "volume", {
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
    Cigarrete.prototype.toString = function () {
        return "Name: " + this.name + "; Price: " + this.price + "; Brand: " + this.brand + "; Volume: " + this._volume + "; Type: " + this.type;
    };
    return Cigarrete;
}(product_1.Product));
exports.Cigarrete = Cigarrete;
