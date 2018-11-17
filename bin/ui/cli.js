"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redleg = require("commander");
var inquirer = require("inquirer");
var questions_1 = require("./questions");
var general_1 = require("./../general");
var products_1 = require("./../products");
var CLI = /** @class */ (function () {
    function CLI(cashRegister) {
        this.cashRegister = cashRegister;
        this.startUp();
    }
    CLI.prototype.addProduct = function () {
        var _this = this;
        redleg
            .command("add")
            .alias("a")
            .description("Add product to inventory")
            .action(function () {
            inquirer.prompt(questions_1.addProductToInventoryQts).then(function (res) {
                switch (res.class) {
                    case "Beverage":
                        _this.addBeverage(res);
                        break;
                    case "Cigarette":
                        _this.addCigarette(res);
                        break;
                    case "Medicine":
                        _this.addMedicine(res);
                        break;
                    case "Snack":
                        _this.addSnack(res);
                        break;
                }
            });
        });
    };
    CLI.prototype.addBeverage = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addBeverageQts).then(function (res) {
            _this.cashRegister.inventory.add(new products_1.Beverage(props.name, Number.parseFloat(props.price), res.brand, new general_1.Quantity(Number.parseInt(res.volumeQnt), res.volumeUoM), res.isCooled), props.quantity);
            console.log("Added " + props.name + " to inventory");
            _this.cashRegister.printInventory();
        });
    };
    CLI.prototype.addCigarette = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addCigaretteQts).then(function (res) {
            _this.cashRegister.inventory.add(new products_1.Cigarette(props.name, Number.parseFloat(props.price), res.brand, res.type, new general_1.Quantity(Number.parseInt(res.volumeQnt), res.volumeUoM)), props.quantity);
            console.log("Added " + props.name + " to inventory");
            _this.cashRegister.printInventory();
        });
    };
    CLI.prototype.addMedicine = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addMedicineQts).then(function (res) {
            _this.cashRegister.inventory.add(new products_1.Medicine(props.name, Number.parseFloat(props.price), res.brand, res.type, res.illness), props.quantity);
            console.log("Added " + props.name + " to inventory");
            _this.cashRegister.printInventory();
        });
    };
    CLI.prototype.addSnack = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addSnackQts).then(function (res) {
            _this.cashRegister.inventory.add(new products_1.Snack(props.name, Number.parseFloat(props.price), res.category, res.brand, res.type, new general_1.Quantity(Number.parseInt(res.energyQnt), res.energyUoM)), props.quantity);
            console.log("Added " + props.name + " to inventory");
            _this.cashRegister.printInventory();
        });
    };
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
                // create new receipt
                _this.cashRegister.createReceipt();
                if (command.select) {
                    command.select.forEach(function (id, idx) {
                        // determine quantity
                        var quantity = command.quantity
                            ? command.quantity[idx]
                                ? Number.parseInt(command.quantity[idx])
                                : 1
                            : 1;
                        // select the product
                        _this.cashRegister.selectProduct(Number.parseInt(id), quantity);
                    });
                }
                if (command.paidAmount) {
                    // application logic: pay the amount
                    _this.cashRegister.payAmount(Number.parseFloat(command.paidAmount));
                }
                // application logic: print the receipt
                _this.cashRegister.printReceipt();
                if (command.list) {
                    // application logic: print the updated list if requested
                    _this.cashRegister.printInventory();
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
            _this.cashRegister.printBrand();
            _this.cashRegister.printInventory();
        });
    };
    CLI.prototype.printProduct = function () {
        var _this = this;
        redleg
            .command("product <id>")
            .alias("pr")
            .description("Print product")
            .action(function (id) {
            _this.cashRegister.printProduct(Number.parseInt(id));
        });
    };
    CLI.prototype.removeProducts = function () {
        var _this = this;
        redleg
            .command("remove <id>")
            .alias("rm")
            .description("Remove product from inventory")
            .action(function (id) {
            console.log("Removing " + _this.cashRegister.inventory.getProduct(Number.parseInt(id))[0].name + " from inventory");
            inquirer.prompt(questions_1.removeProducsQts).then(function (res) {
                if (res.confirm) {
                    var removedPrds = _this.cashRegister.inventory.removeProduct(Number.parseInt(id));
                    console.log("Removed " + removedPrds[0][1] + " items of " + removedPrds[0][0].name);
                }
            });
        });
    };
    CLI.prototype.startUp = function () {
        redleg.version("0.0.1").description("Redleg Vending Machine");
        this.printInventoryList();
        this.orderProduct();
        this.printProduct();
        this.addProduct();
        this.removeProducts();
        redleg.parse(process.argv);
    };
    return CLI;
}());
exports.CLI = CLI;
