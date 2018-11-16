"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("../general");
var Receipt = /** @class */ (function () {
    function Receipt() {
        this._receiptLines = [];
        this._status = general_1.ReceiptStatus.Concept;
        this._totalPaidAmount = 0;
        this._totalPayableAmount = 0;
    }
    Object.defineProperty(Receipt.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
        },
        enumerable: true,
        configurable: true
    });
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
    Receipt.prototype.addProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var prdIdx = this._receiptLines.findIndex(function (prd) { return prd[0].name === product.name; });
        if (prdIdx > -1) {
            this._receiptLines[prdIdx][1] += quantity;
        }
        else {
            this._receiptLines.push([product, quantity]);
        }
        this.totalPayableAmount += quantity * product.price;
        console.log("Receipt: added product: " + this._receiptLines.length);
    };
    Receipt.prototype.removeProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var prdIdx = this._receiptLines.findIndex(function (prd) { return prd[0].name === product.name; });
        if (prdIdx > -1) {
            this._receiptLines[prdIdx][1] - quantity === 0
                ? this._receiptLines.splice(prdIdx, 1)
                : (this._receiptLines[prdIdx][1] -= quantity);
            this.totalPayableAmount -= quantity * product.price;
        }
        console.log("Receipt: removed product: " + this._receiptLines.length);
    };
    Receipt.prototype.payAmount = function (amount) {
        this._totalPaidAmount += amount;
    };
    Receipt.prototype.toString = function () {
        var result = "";
        return result;
    };
    return Receipt;
}());
exports.Receipt = Receipt;
