"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var receipt_1 = require("./receipt");
var general_1 = require("../general");
var CashRegister = /** @class */ (function () {
    function CashRegister(_inventory) {
        this._inventory = _inventory;
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
                console.log(this.receipts.length, this.receipts[this.receipts.length - 1].status);
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
        // console.log(
        //     `CashRegister: Added ${quantity} ${product.name}: Price ${
        //         product.price
        //     }; Total payable amount: ${this.receipt.totalPayableAmount}`
        // );
    };
    CashRegister.prototype.createReceipt = function () {
        this.receipts.push(new receipt_1.Receipt());
    };
    CashRegister.prototype.payAmount = function (amount) {
        var _this = this;
        this.receipt.status = general_1.ReceiptStatus.AwaitingPayment;
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
        // console.log(
        //     `CashRegister: Removed ${quantity} ${
        //         product.name
        //     }; Total payable amount: ${this.receipt.totalPayableAmount}`
        // );
    };
    return CashRegister;
}());
exports.CashRegister = CashRegister;
