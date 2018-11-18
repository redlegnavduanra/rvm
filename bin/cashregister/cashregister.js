"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var receipt_1 = require("./receipt");
var general_1 = require("../general");
var CashRegister = /** @class */ (function () {
    function CashRegister(_inventory) {
        this._inventory = _inventory;
        this._receipts = [];
    }
    Object.defineProperty(CashRegister.prototype, "inventory", {
        get: function () {
            return this._inventory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CashRegister.prototype, "receipt", {
        get: function () {
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
    CashRegister.prototype.cancelReceipt = function () {
        if (this.receipt) {
            this.receipts.splice(this.receipts.length - 1, 1);
            this.inventory.cancelSelection();
        }
    };
    CashRegister.prototype.createReceipt = function () {
        this.receipts.push(new receipt_1.Receipt());
    };
    CashRegister.prototype.finalize = function () {
        var _this = this;
        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(function (prd) {
                _this.inventory.deliver(prd[0], prd[1]);
            });
            this.receipt.finalize();
        }
    };
    CashRegister.prototype.payAmount = function (amount) {
        if (!this.receipt || this.receipt.status === general_1.ReceiptStatus.Closed) {
            this.createReceipt();
        }
        this.receipt.payAmount(amount);
        var remainingAmount = this.receipt.totalPayableAmount > this.receipt.totalPaidAmount
            ? "Remaining amount:\t" + (this.receipt.totalPayableAmount -
                this.receipt.totalPaidAmount).toFixed(2)
            : this.receipt.products.length > 0
                ? "Change:\t\t\t" + (this.receipt.totalPaidAmount -
                    this.receipt.totalPayableAmount).toFixed(2) + "\n\nPlease finish transaction to get your products"
                : "";
        this.printSuccess("\n\nSuccesfully paid:\t" + amount.toFixed(2) + "\n" + remainingAmount + "\n\n");
    };
    CashRegister.prototype.printInventory = function () {
        this.inventory.printList();
    };
    CashRegister.prototype.printProduct = function (id) {
        try {
            this.inventory.printItem(id);
        }
        catch (error) {
            this.printError(error.message);
        }
    };
    CashRegister.prototype.printReceipt = function () {
        this.receipt.printReceipt();
    };
    CashRegister.prototype.printReceipts = function () {
        this.receipts.forEach(function (receipt) { return receipt.printReceipt(); });
    };
    CashRegister.prototype.printSuccess = function (message) {
        console.log(message);
    };
    CashRegister.prototype.printError = function (message) {
        console.error(message);
    };
    CashRegister.prototype.removeProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.receipt.removeProduct(product, quantity);
    };
    CashRegister.prototype.selectProduct = function (id, quantity) {
        if (quantity === void 0) { quantity = 1; }
        try {
            var selectedPrd_1 = this.inventory.getProduct(id);
            var receiptPrd = this.receipt
                ? this.receipt.products.find(function (prd) { return prd[0].name === selectedPrd_1[0].name; })
                : null;
            var totalQuantity = receiptPrd
                ? receiptPrd[1] + quantity
                : quantity;
            if (totalQuantity > selectedPrd_1[1]) {
                this.printError("\n\nCannot provide " + quantity + " " + selectedPrd_1[0].name + ", only " + selectedPrd_1[1] + " in stock\n\n");
                return;
            }
            if (!this.receipt || this.receipt.status === general_1.ReceiptStatus.Closed) {
                this.createReceipt();
            }
            this.inventory.selectProduct(id);
            this.receipt.addProduct(selectedPrd_1[0], quantity);
            this.printSuccess("\n\nSuccesfully selected " + quantity + " of " + selectedPrd_1[0].name + "\tPrice: " + selectedPrd_1[0].price.toFixed(2) + "\tTotal: " + (selectedPrd_1[0].price * quantity).toFixed(2) + "\n\n");
        }
        catch (error) {
            this.printError(error.message);
        }
    };
    return CashRegister;
}());
exports.CashRegister = CashRegister;
