"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var general_1 = require("./../general");
exports.addProductToInventoryQts = [
    {
        type: "list",
        name: "class",
        message: "Select Product",
        choices: ["Beverage", "Cigarette", "Medicine", "Snack"]
    },
    {
        type: "input",
        name: "name",
        message: "Enter name"
    },
    {
        type: "input",
        name: "price",
        message: "Enter price"
    },
    {
        type: "input",
        name: "quantity",
        message: "Enter stock quantity",
        default: "8"
    }
];
exports.addBeverageQts = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(general_1.Brand).map(function (key) { return general_1.Brand[key]; }),
        default: 11
    },
    {
        type: "input",
        name: "volumeQnt",
        message: "Enter the volume of this beverage",
        default: "33"
    },
    {
        type: "list",
        name: "volumeUoM",
        message: "Select volume unit of measurement",
        choices: Object.keys(general_1.UnitOfMeasurement).map(function (key) { return general_1.UnitOfMeasurement[key]; }),
        default: 5
    },
    {
        type: "confirm",
        name: "isCooled",
        message: "Should the beverage be cooled?"
    }
];
exports.addCigaretteQts = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(general_1.Brand).map(function (key) { return general_1.Brand[key]; }),
        default: 0
    },
    {
        type: "list",
        name: "type",
        message: "Select cigarette type",
        choices: Object.keys(general_1.CigarreteType).map(function (key) { return general_1.CigarreteType[key]; }),
        default: 2
    },
    {
        type: "input",
        name: "volumeQnt",
        message: "Enter the amount of cigarettes in this product",
        default: "36"
    },
    {
        type: "list",
        name: "volumeUoM",
        message: "Select unit of measurement for the amount of cigarettes",
        choices: Object.keys(general_1.UnitOfMeasurement).map(function (key) { return general_1.UnitOfMeasurement[key]; }),
        default: 4
    }
];
exports.addMedicineQts = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(general_1.Brand).map(function (key) { return general_1.Brand[key]; }),
        default: 8
    },
    {
        type: "list",
        name: "type",
        message: "Select medicine type",
        choices: Object.keys(general_1.MedicineType).map(function (key) { return general_1.MedicineType[key]; })
    },
    {
        type: "checkbox",
        name: "illness",
        message: "Select the illnesses this medicine is used for",
        choices: Object.keys(general_1.Illness).map(function (key) { return general_1.Illness[key]; })
    }
];
exports.addSnackQts = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(general_1.Brand).map(function (key) { return general_1.Brand[key]; }),
        default: 4
    },
    {
        type: "list",
        name: "category",
        message: "Select snack category",
        choices: Object.keys(general_1.SnackCategory).map(function (key) { return general_1.SnackCategory[key]; })
    },
    {
        type: "list",
        name: "type",
        message: "Select snack type",
        choices: Object.keys(general_1.SnackType).map(function (key) { return general_1.SnackType[key]; })
    },
    {
        type: "input",
        name: "energyQnt",
        message: "Enter the amount of energy in this snack"
    },
    {
        type: "list",
        name: "energyUoM",
        message: "Select unit of measurement for the amount of energy in this snack",
        choices: Object.keys(general_1.UnitOfMeasurement).map(function (key) { return general_1.UnitOfMeasurement[key]; }),
        default: 2
    }
];
exports.cancelQts = [
    {
        type: "confirm",
        name: "confirm",
        message: "Are you sure"
    }
];
exports.homeChoices = [
    "Add product to inventory",
    "Remove product from inventory",
    "Show all receipts",
    "Show available products",
    "Show details of specific product",
    "Select product",
    "Show order",
    "Pay",
    "Finish transaction",
    "Cancel",
    "Quit"
];
exports.homeQts = [
    {
        type: "list",
        name: "home",
        message: "Home screen",
        pageSize: 15
    }
];
exports.payQts = [
    {
        type: "input",
        name: "amount",
        message: "Enter amount"
    }
];
exports.printProductQts = [
    {
        type: "input",
        name: "id",
        message: "Enter id of the product you want to view"
    }
];
exports.printReceiptQts = [
    {
        type: "confirm",
        name: "printreceipt",
        message: "Print receipt?"
    }
];
exports.removeProducsQts = [
    {
        type: "input",
        name: "id",
        message: "Enter product id"
    },
    {
        type: "confirm",
        name: "confirm",
        message: "Are you sure"
    }
];
exports.selectProductQts = [
    {
        type: "input",
        name: "id",
        message: "Enter product id"
    },
    {
        type: "input",
        name: "quantity",
        message: "Enter quantity",
        default: "1"
    }
];
