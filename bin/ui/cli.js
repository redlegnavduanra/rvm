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
        this.isAdmin = false;
        this.startUp();
    }
    CLI.prototype.addProduct = function () {
        var _this = this;
        inquirer.prompt(questions_1.addProductToInventoryQts).then(function (ans) {
            switch (ans.class) {
                case "Beverage":
                    _this.addBeverage(ans);
                    break;
                case "Cigarette":
                    _this.addCigarette(ans);
                    break;
                case "Medicine":
                    _this.addMedicine(ans);
                    break;
                case "Snack":
                    _this.addSnack(ans);
                    break;
            }
        });
    };
    CLI.prototype.addBeverage = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addBeverageQts).then(function (ans) {
            var price = Number.parseFloat(props.price);
            var volumeQnt = Number.parseFloat(ans.volumeQnt);
            if (!isNaN(price) && !isNaN(volumeQnt)) {
                _this.cashRegister.inventory.add(new products_1.Beverage(props.name, price, ans.brand, new general_1.Quantity(volumeQnt, ans.volumeUoM), ans.isCooled), props.quantity);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.addCigarette = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addCigaretteQts).then(function (ans) {
            var price = Number.parseFloat(props.price);
            var volumeQnt = Number.parseFloat(ans.volumeQnt);
            if (!isNaN(price) && !isNaN(volumeQnt)) {
                _this.cashRegister.inventory.add(new products_1.Cigarette(props.name, price, ans.brand, ans.type, new general_1.Quantity(volumeQnt, ans.volumeUoM)), props.quantity);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.addMedicine = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addMedicineQts).then(function (ans) {
            var price = Number.parseFloat(props.price);
            if (!isNaN(price)) {
                _this.cashRegister.inventory.add(new products_1.Medicine(props.name, price, ans.brand, ans.type, ans.illness), props.quantity);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.addSnack = function (props) {
        var _this = this;
        inquirer.prompt(questions_1.addSnackQts).then(function (ans) {
            var price = Number.parseFloat(props.price);
            var energyQnt = Number.parseFloat(ans.energyQnt);
            if (!isNaN(price) && !isNaN(energyQnt)) {
                _this.cashRegister.inventory.add(new products_1.Snack(props.name, price, ans.category, ans.brand, ans.type, new general_1.Quantity(energyQnt, ans.energyUoM)), props.quantity);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.cancel = function () {
        var _this = this;
        inquirer.prompt(questions_1.cancelQts).then(function (ans) {
            if (ans.confirm) {
                _this.cashRegister.cancelReceipt();
            }
            _this.home();
        });
    };
    CLI.prototype.createProducts = function () {
        this.cashRegister.inventory.add(new products_1.Cigarette("Marlboro cigarettes", 25.43, general_1.Brand.Marlboro), 8);
        this.cashRegister.inventory.add(new products_1.Cigarette("Davidoff cigarettes", 23.67, general_1.Brand.Davidoff, general_1.CigarreteType.Light, new general_1.Quantity(36, general_1.UnitOfMeasurement.Unit)), 8);
        this.cashRegister.inventory.add(new products_1.Medicine("Hansaplast BandAid", 1.25, general_1.Brand.Hansaplast, general_1.MedicineType.BandAid, [general_1.Illness.Wound]), 8);
        this.cashRegister.inventory.add(new products_1.Medicine("Paracetamol", 2.97, general_1.Brand.Bayer, general_1.MedicineType.Paracetamol, [general_1.Illness.Earache, general_1.Illness.Migraine, general_1.Illness.Fever]), 8);
        this.cashRegister.inventory.add(new products_1.Snack("PretMix", 2.34, general_1.SnackCategory.Candy, general_1.Brand.RedBand, general_1.SnackType.Fruitgom, new general_1.Quantity(56, general_1.UnitOfMeasurement.Calorie)), 16);
        this.cashRegister.inventory.add(new products_1.Snack("Mars", 2.34, general_1.SnackCategory.ChocoloteBar, general_1.Brand.Mars, general_1.SnackType.Mars, new general_1.Quantity(157, general_1.UnitOfMeasurement.Calorie)), 8);
        this.cashRegister.inventory.add(new products_1.Snack("Snickers", 2.34, general_1.SnackCategory.ChocoloteBar, general_1.Brand.Mars, general_1.SnackType.Snickers, new general_1.Quantity(238, general_1.UnitOfMeasurement.Calorie)), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Coca Cola", 1.0, general_1.Brand.CocaCola, new general_1.Quantity(33, general_1.UnitOfMeasurement.CentiLiter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Fanta", 1.5, general_1.Brand.CocaCola, new general_1.Quantity(33, general_1.UnitOfMeasurement.CentiLiter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("Tropicana", 2.5, general_1.Brand.PepsiCo, new general_1.Quantity(0.5, general_1.UnitOfMeasurement.Liter), true), 16);
        this.cashRegister.inventory.add(new products_1.Beverage("7Up", 1.8, general_1.Brand.PepsiCo, new general_1.Quantity(0.33, general_1.UnitOfMeasurement.CentiLiter), true), 8);
    };
    CLI.prototype.finalize = function () {
        var _this = this;
        this.cashRegister.finalize();
        inquirer.prompt(questions_1.printReceiptQts).then(function (ans) {
            if (ans.printreceipt) {
                _this.cashRegister.printReceipt();
            }
            _this.home();
        });
    };
    CLI.prototype.home = function () {
        var _this = this;
        var choices = questions_1.homeChoices;
        // check for admin rights
        if (!this.isAdmin) {
            choices = choices.filter(function (itm) {
                return (itm !== "Add product to inventory" &&
                    itm !== "Remove product from inventory" &&
                    itm !== "Show all receipts");
            });
        }
        // if there is no space left, don't provide adding action
        if (this.cashRegister.inventory.fullEmptyRows === 0) {
            choices = choices.filter(function (itm) {
                return itm !== "Add product to inventory";
            });
        }
        // if there is no current order, don't display order actions
        if (!this.cashRegister.receipt ||
            this.cashRegister.receipt.status === general_1.ReceiptStatus.Closed) {
            choices = choices.filter(function (itm) {
                return (itm !== "Show order" &&
                    itm !== "Finish transaction" &&
                    itm !== "Cancel");
            });
        }
        else {
            // if there is already paid, but not enough,
            // don't allow to finish the transaction
            if (this.cashRegister.receipt.totalPaidAmount <
                this.cashRegister.receipt.totalPayableAmount) {
                choices = choices.filter(function (itm) {
                    return itm !== "Finish transaction";
                });
            }
            // if there is already paid, but no selected products
            // don't allow to finish the transaction and deselection of products
            if (this.cashRegister.receipt.products.length === 0) {
                choices = choices.filter(function (itm) {
                    return itm !== "Finish transaction";
                });
            }
        }
        questions_1.homeQts[0].choices = choices;
        inquirer.prompt(questions_1.homeQts).then(function (ans) {
            switch (ans.home) {
                case "Add product to inventory":
                    _this.addProduct();
                    break;
                case "Remove product from inventory":
                    _this.removeProducts();
                    break;
                case "Show all receipts":
                    _this.printReceipts();
                    break;
                case "Show available products":
                    _this.printInventory();
                    break;
                case "Select product":
                    _this.selectProduct();
                    break;
                case "Pay":
                    _this.payAmount();
                    break;
                case "Finish transaction":
                    _this.finalize();
                    break;
                case "Show order":
                    _this.printSeletedProducts();
                    break;
                case "Cancel":
                    _this.cancel();
                    break;
                case "Quit":
                    break;
            }
        });
    };
    CLI.prototype.payAmount = function () {
        var _this = this;
        inquirer.prompt(questions_1.payQts).then(function (ans) {
            var amount = Number.parseFloat(ans.amount);
            if (!isNaN(amount)) {
                _this.cashRegister.payAmount(amount);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.printBrand = function () {
        console.log("\n\n*********************************************************************************************************************************************************\n\n                rrrrr    eeeeeeee  dddddd    ll      eeeeeeee    gggggggg    \"\"    ssssss          vv           vv  mm         mm\n                rr  rr   eee       dd    d   ll      ee        gg       gg   \"\"   ss                vv         vv   mmm       mmm\n                rr  rr   ee        dd     d  ll      ee        gg                 ss                 vv       vv    mmmm     mmmm\n                rrrr     eeeee     dd     d  ll      eeeee     gg   ggggg          ssssss             vv     vv     mm mm   mm mm\n                rr  r    ee        dd     d  ll      ee        gg        gg             ss             vv   vv      mm  mm mm  mm\n                rr   r   ee        dd    d   ll      ee        gg        gg             ss              vv vv       mm   mmm   mm\n                rr    r  eeeeeeee  dddddd    llllll  eeeeeeee    gggggggg          ssssss                vvv        mm         mm \n  \n*********************************************************************************************************************************************************\n\n        ");
    };
    CLI.prototype.printInventory = function () {
        this.cashRegister.printInventory();
        this.home();
    };
    CLI.prototype.printSeletedProducts = function () {
        this.cashRegister.printReceipt();
        this.home();
    };
    CLI.prototype.printReceipts = function () {
        this.cashRegister.printReceipts();
        this.home();
    };
    CLI.prototype.removeProducts = function () {
        var _this = this;
        inquirer.prompt(questions_1.removeProducsQts).then(function (ans) {
            if (ans.confirm) {
                var id = Number.parseInt(ans.id);
                if (!isNaN(id)) {
                    try {
                        _this.cashRegister.inventory.removeProduct(id);
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                }
                else {
                    console.error("Invalid input; please try again");
                }
            }
            _this.home();
        });
    };
    CLI.prototype.selectProduct = function () {
        var _this = this;
        inquirer.prompt(questions_1.selectProductQts).then(function (ans) {
            var id = Number.parseInt(ans.id);
            var quantity = Number.parseInt(ans.quantity);
            if (!isNaN(id) && !isNaN(quantity)) {
                _this.cashRegister.selectProduct(id, quantity);
            }
            else {
                console.error("Invalid input; please try again");
            }
            _this.home();
        });
    };
    CLI.prototype.checkSize = function (val) {
        return val.split(",");
    };
    CLI.prototype.startUp = function () {
        var _this = this;
        redleg
            .version("1.0.0")
            .description("Redleg's Vending Machine")
            .option("-e, --empty", "Initiate Redleg's Vending Machine without prefilled inventory")
            .option("-a, --admin", "Use admin rights for managing inventory")
            .option("-s, --size <size>", "Provide <#rows,#itemsInRow> for setting size of the inventory", this.checkSize)
            .action(function (options) {
            _this.printBrand();
            if (options.size) {
                if (options.size.length !== 2) {
                    console.error("provide two values for setting size of the inventory; default size will be used");
                }
                else {
                    var maxrows = Number.parseInt(options.size[0]);
                    var maxitems = Number.parseInt(options.size[1]);
                    if (!isNaN(maxrows) && !isNaN(maxitems)) {
                        _this.cashRegister.inventory.maxRows = maxrows;
                        _this.cashRegister.inventory.maxItemsPerRow = maxitems;
                        console.log("Inventory resized to: " + maxrows + " x " + maxitems + "\nTotal size: " + _this.cashRegister.inventory.size + "\n");
                    }
                }
            }
            if (!options.empty) {
                _this.createProducts();
                console.log("\n");
            }
            _this.isAdmin = options.admin;
            _this.home();
        });
        redleg.parse(process.argv);
    };
    return CLI;
}());
exports.CLI = CLI;
