"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Volume = /** @class */ (function () {
    function Volume(amount, unitOfMeasurement) {
        this.amount = amount;
        this.unitOfMeasurement = unitOfMeasurement;
    }
    Volume.prototype.toString = function () {
        return this.amount + " " + this.unitOfMeasurement;
    };
    return Volume;
}());
exports.Volume = Volume;
