"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Receipt = /** @class */ (function () {
    function Receipt() {
        this._receiptLines = [];
        this._totalPaidAmount = 0;
        this._totalPayableAmount = 0;
    }
    Object.defineProperty(Receipt.prototype, "products", {
        get: function () {
            return this._receiptLines;
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
    };
    Receipt.prototype.payAmount = function (amount) {
        this._totalPaidAmount += amount;
    };
    Receipt.prototype.printReceipt = function () {
        console.log("" + this);
    };
    Receipt.prototype.toString = function () {
        var title = this.totalPaidAmount >= this.totalPayableAmount
            ? " YOUR PURCHASE"
            : "    YOUR ORDER";
        var result = "\n*****************************************************************\n*\t\t\t" + title + "\t\t\t\t*\n*****************************************************************\n";
        this._receiptLines.forEach(function (prd) {
            var prodName = prd[0].name.length < 10 ? prd[0].name + "\t" : "" + prd[0].name;
            result += "*   " + prodName + "\t" + prd[1] + "\t\u20AC " + prd[0].price.toFixed(2) + "\t\t\u20AC " + (prd[1] * prd[0].price).toFixed(2) + "\t\t*\n";
        });
        result += "*\t\t\t\t\t\t\t\t*\n*\t\t\t\t\t\t\t\t*\n*   Total:\t\t\t\t\t\u20AC " + this.totalPayableAmount + "\t\t*\n*---------------------------------------------------------------*\n*   Paid:\t\t\t\t\t\u20AC " + this.totalPaidAmount.toFixed(2) + "\t\t*";
        result +=
            this.totalPaidAmount - this.totalPayableAmount >= 0
                ? "\n*   Change:\t\t\t\t\t\u20AC " + (this.totalPaidAmount - this.totalPayableAmount).toFixed(2) + "\t\t*"
                : "";
        result += "\n*****************************************************************";
        return result;
    };
    return Receipt;
}());
exports.Receipt = Receipt;
