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
var Medicine = /** @class */ (function (_super) {
    __extends(Medicine, _super);
    function Medicine(_name, _price, _brand, _type, _illness) {
        var _this = _super.call(this, _name, _price, _brand) || this;
        _this._name = _name;
        _this._price = _price;
        _this._brand = _brand;
        _this._type = _type;
        _this._illness = _illness;
        return _this;
    }
    Object.defineProperty(Medicine.prototype, "illness", {
        get: function () {
            return this._illness;
        },
        set: function (illness) {
            this._illness = illness;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Medicine.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Medicine.prototype.addIllness = function (illness) {
        if (this._illness.find(function (itm) { return itm === illness; })) {
            return;
        }
        this._illness.push(illness);
    };
    Medicine.prototype.removeIllness = function (illness) {
        var illnessIdx = this._illness.findIndex(function (itm) { return itm === illness; });
        if (illnessIdx > -1) {
            this._illness.splice(illnessIdx, 1);
        }
    };
    Medicine.prototype.toString = function () {
        return "Name: " + this.name + "; Price: " + this.price + "; Type: " + this.type + "; Applicable for: " + this.illness + " ";
    };
    return Medicine;
}(product_1.Product));
exports.Medicine = Medicine;
