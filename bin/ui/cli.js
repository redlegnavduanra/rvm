"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redleg = require("commander");
var CLI = /** @class */ (function () {
    function CLI(inventory, cashRegister) {
        this.inventory = inventory;
        this.cashRegister = cashRegister;
        this.startUp();
    }
    CLI.prototype.orderProduct = function () {
        var _this = this;
        redleg
            .command("order")
            .alias("o")
            .description("Order product")
            .option("-s, --select <productId>", "The id of the selected products in the list", this.parseArgsList)
            .option("-q, --quantity <quantity>", "The quantity for the selected products", this.parseArgsList)
            .option("-p, --paidAmount <paidAmount>", "The paid amount", parseFloat)
            .option("-l, --list", "Show resulting products list")
            .action(function (command) {
            try {
                // application logic: create new receipt
                _this.cashRegister.createReceipt();
                if (command.select) {
                    command.select.forEach(function (id, idx) {
                        // determine quantity
                        var quantity = command.quantity
                            ? command.quantity[idx]
                                ? Number.parseInt(command.quantity[idx])
                                : 1
                            : 1;
                        // application logic: select in the inventory and add to the receipt
                        _this.inventory.selectProduct(Number.parseInt(id));
                        _this.cashRegister.addProduct(_this.inventory.selectedProduct[0], quantity);
                    });
                }
                if (command.paidAmount) {
                    // application logic: pay the amount
                    _this.cashRegister.payAmount(Number.parseFloat(command.paidAmount));
                }
                // application logic: print the receipt
                _this.cashRegister.receipt.printReceipt();
                if (command.list) {
                    // application logic: print the updated list if requested
                    _this.inventory.printList();
                }
            }
            catch (error) {
                console.log(error.message);
            }
        });
    };
    CLI.prototype.parseArgsList = function (val) {
        return val.split(",");
    };
    CLI.prototype.printInventoryList = function () {
        var _this = this;
        redleg
            .command("list")
            .alias("ls")
            .description("Print inventory list")
            .action(function () {
            _this.inventory.printList();
        });
    };
    CLI.prototype.startUp = function () {
        redleg.version("0.0.1").description("Redleg Vending Machine");
        this.printInventoryList();
        this.orderProduct();
        redleg.parse(process.argv);
    };
    return CLI;
}());
exports.CLI = CLI;
