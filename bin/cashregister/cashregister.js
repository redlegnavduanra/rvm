"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var receipt_1 = require("./receipt");
var CashRegister = /** @class */ (function () {
    function CashRegister(_inventory) {
        this._inventory = _inventory;
        this._receipts = [];
    }
    Object.defineProperty(CashRegister.prototype, "receipt", {
        get: function () {
            if (this.receipts.length === 0) {
                throw Error("Cannot get receipt: no receipt initialized");
            }
            return this.receipts[this.receipts.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashRegister.prototype, "receipts", {
        get: function () {
            return this._receipts;
        },
        enumerable: true,
        configurable: true
    });
    CashRegister.prototype.addProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.receipt.addProduct(product, quantity);
    };
    CashRegister.prototype.createReceipt = function () {
        this.receipts.push(new receipt_1.Receipt());
    };
    CashRegister.prototype.payAmount = function (amount) {
        var _this = this;
        this.receipt.payAmount(amount);
        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(function (prd) {
                _this._inventory.remove(prd[0], prd[1]);
            });
        }
    };
    CashRegister.prototype.removeProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.receipt.removeProduct(product, quantity);
    };
    return CashRegister;
}());
exports.CashRegister = CashRegister;
