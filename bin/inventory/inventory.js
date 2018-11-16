"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Inventory = /** @class */ (function () {
    function Inventory(_maxRows, _maxItemsPerRow) {
        this._maxRows = _maxRows;
        this._maxItemsPerRow = _maxItemsPerRow;
        this._products = [];
        this._selectedProduct = -1;
    }
    Object.defineProperty(Inventory.prototype, "fullEmptyRows", {
        get: function () {
            var _this = this;
            var totalOccupiedRows = this._products
                .map(function (prd) { return Math.ceil(prd[1] / _this.maxItemsPerRow); })
                .reduce(function (acc, cur) { return acc + cur; }, 0);
            return this.maxRows - totalOccupiedRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "fullEmptyRowsSlots", {
        get: function () {
            return this.fullEmptyRows * this.maxItemsPerRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "maxRows", {
        get: function () {
            return this._maxRows;
        },
        set: function (maxRows) {
            this._maxRows = maxRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "maxItemsPerRow", {
        get: function () {
            return this._maxItemsPerRow;
        },
        set: function (maxItems) {
            this._maxItemsPerRow = maxItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "selectedProduct", {
        get: function () {
            if (this._selectedProduct < 0) {
                throw Error("No product selected");
            }
            return this._products[this._selectedProduct];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Inventory.prototype, "size", {
        get: function () {
            return this._maxRows * this._maxItemsPerRow;
        },
        enumerable: true,
        configurable: true
    });
    // adding a product is only allowed into complete free rows and into rows where the products already added before.
    // Two different products in the same row are not allowed
    Inventory.prototype.add = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var prdIdx = this._products.findIndex(function (prd) { return prd[0].name === product.name; });
        var totalFreeSlots = prdIdx < 0
            ? this.fullEmptyRowsSlots
            : this.fullEmptyRowsSlots +
                (this.maxItemsPerRow -
                    (this._products[prdIdx][1] % this.maxItemsPerRow));
        if (quantity <= totalFreeSlots) {
            prdIdx < 0
                ? this._products.push([product, quantity])
                : (this._products[prdIdx][1] += quantity);
            console.log("Inventory: Added " + quantity + " items of " + product.name);
        }
        else {
            console.error("Inventory: Cannot add " +
                quantity +
                " items of " +
                product.name +
                ", because you there are only " +
                totalFreeSlots +
                " slots available");
        }
    };
    Inventory.prototype.getProduct = function (id) {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot get product: invalid id provided");
        }
        return this._products[id];
    };
    Inventory.prototype.printItem = function (id) {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot print item: invalid id provided");
        }
        return "" + this._products[id];
    };
    Inventory.prototype.printItems = function () {
        var result = "";
        this._products.forEach(function (product) { return (result += "\n" + product[0]); });
        return result;
    };
    Inventory.prototype.remove = function (product, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var prdIdx = this._products.findIndex(function (prd) { return prd[0].name === product.name; });
        if (prdIdx < 0) {
            console.error("Inventory: Cannot find product " + product.name);
        }
        else {
            if (quantity > this._products[prdIdx][1]) {
                console.error("Inventory: Cannot remove " + quantity + " " + product.name + "; only " + this._products[prdIdx][1] + " available");
            }
            else {
                this._products[prdIdx][1] -= quantity;
                console.log("Inventory: " + quantity + " " + product.name + " removed; " + this._products[prdIdx][1] + " remaining");
            }
        }
    };
    Inventory.prototype.selectProduct = function (name) {
        this._selectedProduct = this._products.findIndex(function (prd) { return prd[0].name === name; });
    };
    // render a nice output to the console
    Inventory.prototype.toString = function () {
        var _this = this;
        var result = "\n*********************************************************************************************************************************************************\n*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tQuantity\t|\tUsed Rows\t|\tFree lots\t*\n*-------------------------------------------------------------------------------------------------------------------------------------------------------*\n";
        this._products.forEach(function (product, idx) {
            var prodNameTabs = 4 - product[0].name.length / 8;
            var tabs = "";
            for (var i = 0; i < prodNameTabs; i++) {
                tabs += "\t";
            }
            var availableSlots = product[1] % _this.maxItemsPerRow > 0
                ? _this.maxItemsPerRow - (product[1] % _this.maxItemsPerRow)
                : "";
            result += "*\t" + idx + "\t|\t" + product[0].name + tabs + "|\t\u20AC " + product[0].price + "\t\t|\t" + product[1] + "\t\t|\t" + Math.ceil(product[1] / _this.maxItemsPerRow) + "\t\t|\t" + availableSlots + "\t\t*\n";
        });
        result += "*********************************************************************************************************************************************************\n*\tTotal Stock size: " + this.size + " (" + this.maxRows + " rows of " + this.maxItemsPerRow + " slots)\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tUsed rows: " + (this.maxRows -
            this
                .fullEmptyRows) + "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tFree rows: " + this.fullEmptyRows + "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*********************************************************************************************************************************************************\n";
        return result;
    };
    return Inventory;
}());
exports.Inventory = Inventory;
