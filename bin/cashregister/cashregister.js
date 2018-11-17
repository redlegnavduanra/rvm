"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var receipt_1 = require("./receipt");
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
    CashRegister.prototype.selectProduct = function (id, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.inventory.selectProduct(id);
        this.receipt.addProduct(this.inventory.getProduct(id)[0], quantity);
    };
    CashRegister.prototype.createReceipt = function () {
        this.receipts.push(new receipt_1.Receipt());
    };
    CashRegister.prototype.payAmount = function (amount) {
        var _this = this;
        this.receipt.payAmount(amount);
        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(function (prd) {
                _this.inventory.remove(prd[0], prd[1]);
            });
        }
    };
    CashRegister.prototype.printBrand = function () {
        console.log("\n\n\n*********************************************************************************************************************************************************\n\n                rrrrr    eeeeeeee  dddddd    ll      eeeeeeee    gggggggg    \"\"    ssssss          vv           vv  mm         mm\n                rr  rr   eee       dd    d   ll      ee        gg       gg   \"\"   ss                vv         vv   mmm       mmm\n                rr  rr   ee        dd     d  ll      ee        gg                 ss                 vv       vv    mmmm     mmmm\n                rrrr     eeeee     dd     d  ll      eeeee     gg   ggggg          ssssss             vv     vv     mm mm   mm mm\n                rr  r    ee        dd     d  ll      ee        gg        gg             ss             vv   vv      mm  mm mm  mm\n                rr   r   ee        dd    d   ll      ee        gg        gg             ss              vv vv       mm   mmm   mm\n                rr    r  eeeeeeee  dddddd    llllll  eeeeeeee    gggggggg          ssssss                vvv        mm         mm \n  \n*********************************************************************************************************************************************************\n\n        ");
    };
    CashRegister.prototype.printInventory = function () {
        this.inventory.printList();
    };
    CashRegister.prototype.printProduct = function (id) {
        this.inventory.printItem(id);
    };
    CashRegister.prototype.printReceipt = function () {
        this.receipt.printReceipt();
    };
    CashRegister.prototype.removeProduct = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.receipt.removeProduct(product, quantity);
    };
    return CashRegister;
}());
exports.CashRegister = CashRegister;
