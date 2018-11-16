"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paymentMethod_1 = require("./paymentMethod");
var Receipt = /** @class */ (function () {
    function Receipt(_totalPayableAmount, _totalPaidAmount) {
        if (_totalPayableAmount === void 0) { _totalPayableAmount = 0; }
        if (_totalPaidAmount === void 0) { _totalPaidAmount = 0; }
        this._totalPayableAmount = _totalPayableAmount;
        this._totalPaidAmount = _totalPaidAmount;
        this._paymentMethod = new paymentMethod_1.PaymentMethod();
    }
    Object.defineProperty(Receipt.prototype, "totalPaidAmount", {
        get: function () {
            return this._totalPaidAmount;
        },
        set: function (amount) {
            this._totalPaidAmount = amount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Receipt.prototype, "totalPayableAmount", {
        get: function () {
            return this._totalPayableAmount;
        },
        set: function (amount) {
            this._totalPayableAmount = amount;
        },
        enumerable: true,
        configurable: true
    });
    Receipt.prototype.addPaidAmount = function (amount) {
        this._totalPaidAmount += amount;
    };
    Receipt.prototype.doPayment = function () { };
    Receipt.prototype.returnChange = function () {
        return this._totalPaidAmount > this._totalPayableAmount
            ? this._totalPayableAmount - this.totalPaidAmount
            : 0;
    };
    return Receipt;
}());
exports.Receipt = Receipt;
