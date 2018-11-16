"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quantity = /** @class */ (function () {
    function Quantity(amount, unitOfMeasurement) {
        this.amount = amount;
        this.unitOfMeasurement = unitOfMeasurement;
    }
    Quantity.prototype.toString = function () {
        return this.amount + " " + this.unitOfMeasurement;
    };
    return Quantity;
}());
exports.Quantity = Quantity;
