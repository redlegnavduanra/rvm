"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var receipt_1 = require("./receipt");
var general_1 = require("../general");
var CashRegister = /** @class */ (function () {
    function CashRegister() {
        this._receipts = [];
        this._paymentMethod = null;
    }
    Object.defineProperty(CashRegister.prototype, "paymentMethod", {
        get: function () {
            if (!this._paymentMethod) {
                throw Error("Cannot get paymentMethod: no receipt initialized");
            }
            return this._paymentMethod;
        },
        set: function (paymentMethod) {
            this._paymentMethod = paymentMethod;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashRegister.prototype, "receipt", {
        get: function () {
            if (this.receipts.length === 0 ||
                this.receipts[this.receipts.length - 1].status ===
                    general_1.ReceiptStatus.Closed) {
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
        console.log("CashRegister: Added " + quantity + " " + product.name + ": Price " + product.price + "; Total payable amount: " + this.receipt.totalPayableAmount);
    };
    CashRegister.prototype.createReceipt = function () {
        this.receipts.push(new receipt_1.Receipt());
    };
    CashRegister.prototype.payAmount = function (amount) {
        this.receipt.payAmount(amount);
        console.log("CashRegister: Total payable amount: " + this.receipt.totalPayableAmount + "; Paid amount: " + amount + "; Total paid amount: " + this.receipt.totalPaidAmount + "; Change: " + (this.receipt.totalPaidAmount -
            this.receipt.totalPayableAmount));
    };
    CashRegister.prototype.removeProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.receipt.removeProduct(product, quantity);
        console.log("CashRegister: Removed " + quantity + " " + product.name + "; Total payable amount: " + this.receipt.totalPayableAmount);
    };
    return CashRegister;
}());
exports.CashRegister = CashRegister;
