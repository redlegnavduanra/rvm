import {
    Brand,
    CigarreteType,
    Illness,
    MedicineType,
    SnackCategory,
    SnackType,
    UnitOfMeasurement
} from "./../general";

export const addProductToInventoryQts: Object[] = [
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

export const addBeverageQts: Object[] = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(Brand).map(key => Brand[key as any]),
        default: 11
    },
    {
        type: "input",
        name: "volumeQnt",
        message: "Enter volume quantity",
        default: "33"
    },
    {
        type: "list",
        name: "volumeUoM",
        message: "Select volume unit of measurement",
        choices: Object.keys(UnitOfMeasurement).map(
            key => UnitOfMeasurement[key as any]
        ),
        default: 5
    },
    {
        type: "confirm",
        name: "isCooled",
        message: "Should the beverage be cooled?"
    }
];

export const addCigaretteQts: Array<Object> = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(Brand).map(key => Brand[key as any]),
        default: 0
    },
    {
        type: "list",
        name: "type",
        message: "Select cigarette type",
        choices: Object.keys(CigarreteType).map(
            key => CigarreteType[key as any]
        ),
        default: 2
    },
    {
        type: "input",
        name: "volumeQnt",
        message: "Enter volume quantity",
        default: "36"
    },
    {
        type: "list",
        name: "volumeUoM",
        message: "Select volume unit of measurement",
        choices: Object.keys(UnitOfMeasurement).map(
            key => UnitOfMeasurement[key as any]
        ),
        default: 4
    }
];

export const addMedicineQts: Object[] = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(Brand).map(key => Brand[key as any]),
        default: 8
    },
    {
        type: "list",
        name: "type",
        message: "Select medicine type",
        choices: Object.keys(MedicineType).map(key => MedicineType[key as any])
    },
    {
        type: "checkbox",
        name: "illness",
        message: "Select the illnesses this medicine is used for",
        choices: Object.keys(Illness).map(key => Illness[key as any])
    }
];

export const addSnackQts: Object[] = [
    {
        type: "list",
        name: "brand",
        message: "Select brand",
        choices: Object.keys(Brand).map(key => Brand[key as any]),
        default: 4
    },
    {
        type: "list",
        name: "category",
        message: "Select snack category",
        choices: Object.keys(SnackCategory).map(
            key => SnackCategory[key as any]
        )
    },
    {
        type: "list",
        name: "type",
        message: "Select snack type",
        choices: Object.keys(SnackType).map(key => SnackType[key as any])
    },
    {
        type: "input",
        name: "energyQnt",
        message: "Enter energy quantity"
    },
    {
        type: "list",
        name: "energyUoM",
        message: "Select energy unit of measurement",
        choices: Object.keys(UnitOfMeasurement).map(
            key => UnitOfMeasurement[key as any]
        ),
        default: 2
    }
];

export const removeProducsQts: Object[] = [
    {
        type: "confirm",
        name: "confirm",
        message: "Are you sure"
    }
];
