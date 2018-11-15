"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnitOfMeasurement;
(function (UnitOfMeasurement) {
    UnitOfMeasurement["Joule"] = "J";
    UnitOfMeasurement["KiloJoule"] = "KJ";
    UnitOfMeasurement["Calorie"] = "Cal";
    UnitOfMeasurement["KiloCalorie"] = "KCal";
})(UnitOfMeasurement = exports.UnitOfMeasurement || (exports.UnitOfMeasurement = {}));
var Energy = /** @class */ (function () {
    function Energy(amount, unitOfMeasurement) {
        this.amount = amount;
        this.unitOfMeasurement = unitOfMeasurement;
    }
    Energy.prototype.toString = function () {
        return this.amount + " " + this.unitOfMeasurement;
    };
    return Energy;
}());
exports.Energy = Energy;
