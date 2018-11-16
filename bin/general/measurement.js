"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Measurement = /** @class */ (function () {
    function Measurement(amount, unitOfMeasurement) {
        this.amount = amount;
        this.unitOfMeasurement = unitOfMeasurement;
    }
    Measurement.prototype.toString = function () {
        return this.amount + " " + this.unitOfMeasurement;
    };
    return Measurement;
}());
exports.Measurement = Measurement;
