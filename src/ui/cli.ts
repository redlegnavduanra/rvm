import * as redleg from "commander";
import * as inquirer from "inquirer";
import { CashRegister } from "./../cashregister";
import {
    addBeverageQts,
    addCigaretteQts,
    addMedicineQts,
    addProductToInventoryQts,
    addSnackQts,
    cancelQts,
    homeChoices,
    homeQts,
    payQts,
    printProductQts,
    printReceiptQts,
    removeProducsQts,
    selectProductQts
} from "./questions";
import {} from "./../general";

import {
    Brand,
    CigarreteType,
    Illness,
    Quantity,
    MedicineType,
    ReceiptStatus,
    SnackType,
    SnackCategory,
    UnitOfMeasurement
} from "./../general";

import { Cigarette, Medicine, Snack, Beverage } from "./../products";

export class CLI {
    private isAdmin: boolean;

    constructor(private cashRegister: CashRegister) {
        this.isAdmin = false;
        this.startUp();
    }

    private addProduct() {
        inquirer.prompt(addProductToInventoryQts).then(ans => {
            switch ((ans as any).class) {
                case "Beverage":
                    this.addBeverage(ans);
                    break;
                case "Cigarette":
                    this.addCigarette(ans);
                    break;
                case "Medicine":
                    this.addMedicine(ans);
                    break;
                case "Snack":
                    this.addSnack(ans);
                    break;
            }
        });
    }

    private addBeverage(props: any) {
        inquirer.prompt(addBeverageQts).then(ans => {
            const price = Number.parseFloat(props.price);
            const volumeQnt = Number.parseFloat((ans as any).volumeQnt);

            if (!isNaN(price) && !isNaN(volumeQnt)) {
                this.cashRegister.inventory.add(
                    new Beverage(
                        props.name,
                        price,
                        (ans as any).brand,
                        new Quantity(volumeQnt, (ans as any).volumeUoM),
                        (ans as any).isCooled
                    ),
                    props.quantity
                );
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private addCigarette(props: any) {
        inquirer.prompt(addCigaretteQts).then(ans => {
            const price = Number.parseFloat(props.price);
            const volumeQnt = Number.parseFloat((ans as any).volumeQnt);

            if (!isNaN(price) && !isNaN(volumeQnt)) {
                this.cashRegister.inventory.add(
                    new Cigarette(
                        props.name,
                        price,
                        (ans as any).brand,
                        (ans as any).type,
                        new Quantity(volumeQnt, (ans as any).volumeUoM)
                    ),
                    props.quantity
                );
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private addMedicine(props: any) {
        inquirer.prompt(addMedicineQts).then(ans => {
            const price = Number.parseFloat(props.price);

            if (!isNaN(price)) {
                this.cashRegister.inventory.add(
                    new Medicine(
                        props.name,
                        price,
                        (ans as any).brand,
                        (ans as any).type,
                        (ans as any).illness
                    ),
                    props.quantity
                );
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private addSnack(props: any) {
        inquirer.prompt(addSnackQts).then(ans => {
            const price = Number.parseFloat(props.price);
            const energyQnt = Number.parseFloat((ans as any).energyQnt);

            if (!isNaN(price) && !isNaN(energyQnt)) {
                this.cashRegister.inventory.add(
                    new Snack(
                        props.name,
                        price,
                        (ans as any).category,
                        (ans as any).brand,
                        (ans as any).type,
                        new Quantity(energyQnt, (ans as any).energyUoM)
                    ),
                    props.quantity
                );
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private cancel() {
        inquirer.prompt(cancelQts).then(ans => {
            if ((ans as any).confirm) {
                this.cashRegister.cancelReceipt();
            }

            this.home();
        });
    }

    private createProducts() {
        this.cashRegister.inventory.add(
            new Cigarette("Marlboro cigarettes", 25.43, Brand.Marlboro),
            8
        );

        this.cashRegister.inventory.add(
            new Cigarette(
                "Davidoff cigarettes",
                23.67,
                Brand.Davidoff,
                CigarreteType.Light,
                new Quantity(36, UnitOfMeasurement.Unit)
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Medicine(
                "Hansaplast BandAid",
                1.25,
                Brand.Hansaplast,
                MedicineType.BandAid,
                [Illness.Wound]
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Medicine(
                "Paracetamol",
                2.97,
                Brand.Bayer,
                MedicineType.Paracetamol,
                [Illness.Earache, Illness.Migraine, Illness.Fever]
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Snack(
                "PretMix",
                2.34,
                SnackCategory.Candy,
                Brand.RedBand,
                SnackType.Fruitgom,
                new Quantity(56, UnitOfMeasurement.Calorie)
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Snack(
                "Mars",
                2.34,
                SnackCategory.ChocoloteBar,
                Brand.Mars,
                SnackType.Mars,
                new Quantity(157, UnitOfMeasurement.Calorie)
            ),
            8
        );

        this.cashRegister.inventory.add(
            new Snack(
                "Snickers",
                2.34,
                SnackCategory.ChocoloteBar,
                Brand.Mars,
                SnackType.Snickers,
                new Quantity(238, UnitOfMeasurement.Calorie)
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Coca Cola",
                1.0,
                Brand.CocaCola,
                new Quantity(33, UnitOfMeasurement.CentiLiter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Fanta",
                1.5,
                Brand.CocaCola,
                new Quantity(33, UnitOfMeasurement.CentiLiter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "Tropicana",
                2.5,
                Brand.PepsiCo,
                new Quantity(0.5, UnitOfMeasurement.Liter),
                true
            ),
            16
        );

        this.cashRegister.inventory.add(
            new Beverage(
                "7Up",
                1.8,
                Brand.PepsiCo,
                new Quantity(0.33, UnitOfMeasurement.CentiLiter),
                true
            ),
            8
        );
    }

    private finalize() {
        this.cashRegister.finalize();

        inquirer.prompt(printReceiptQts).then(ans => {
            if ((ans as any).printreceipt) {
                this.cashRegister.printReceipt();
            }

            this.home();
        });
    }

    private home() {
        let choices: string[] = [...homeChoices];
        // check for admin rights
        if (!this.isAdmin) {
            choices = choices.filter((itm: string) => {
                return (
                    itm !== "Add product to inventory" &&
                    itm !== "Remove product from inventory" &&
                    itm !== "Show all receipts"
                );
            });
        }

        // if there is no space left, don't provide adding action
        if (this.cashRegister.inventory.fullEmptyRows === 0) {
            choices = choices.filter((itm: string) => {
                return itm !== "Add product to inventory";
            });
        }

        // if there is no current order, don't display order actions
        if (
            !this.cashRegister.receipt ||
            this.cashRegister.receipt.status === ReceiptStatus.Closed
        ) {
            choices = choices.filter((itm: string) => {
                return (
                    itm !== "Show order" &&
                    itm !== "Finish transaction" &&
                    itm !== "Cancel"
                );
            });
        } else {
            // if there is already paid, but not enough,
            // don't allow to finish the transaction
            if (
                this.cashRegister.receipt.totalPaidAmount <
                this.cashRegister.receipt.totalPayableAmount
            ) {
                choices = choices.filter((itm: string) => {
                    return itm !== "Finish transaction";
                });
            }

            // if there is already paid, but no selected products
            // don't allow to finish the transaction and deselection of products
            if (this.cashRegister.receipt.products.length === 0) {
                choices = choices.filter((itm: string) => {
                    return itm !== "Finish transaction";
                });
            }
        }

        (homeQts as any)[0].choices = choices;

        inquirer.prompt(homeQts).then(ans => {
            switch ((ans as any).home) {
                case homeChoices[0]:
                    this.addProduct();
                    break;
                case homeChoices[1]:
                    this.removeProducts();
                    break;
                case homeChoices[2]:
                    this.printReceipts();
                    break;
                case homeChoices[3]:
                    this.printInventory();
                    break;
                case homeChoices[4]:
                    this.printProduct();
                    break;
                case homeChoices[5]:
                    this.selectProduct();
                    break;
                case homeChoices[6]:
                    this.printSelectedProducts();
                    break;
                case homeChoices[7]:
                    this.payAmount();
                    break;
                case homeChoices[8]:
                    this.finalize();
                    break;
                case homeChoices[9]:
                    this.cancel();
                    break;
                case homeChoices[10]:
                    break;
            }
        });
    }

    private payAmount() {
        inquirer.prompt(payQts).then(ans => {
            const amount = Number.parseFloat((ans as any).amount);
            if (!isNaN(amount)) {
                this.cashRegister.payAmount(amount);
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private printBrand() {
        console.log(`

*********************************************************************************************************************************************************

                rrrrr    eeeeeeee  dddddd    ll      eeeeeeee    gggggggg    ""    ssssss          vv           vv  mm         mm
                rr  rr   eee       dd    d   ll      ee        gg       gg   ""   ss                vv         vv   mmm       mmm
                rr  rr   ee        dd     d  ll      ee        gg                 ss                 vv       vv    mmmm     mmmm
                rrrr     eeeee     dd     d  ll      eeeee     gg   ggggg          ssssss             vv     vv     mm mm   mm mm
                rr  r    ee        dd     d  ll      ee        gg        gg             ss             vv   vv      mm  mm mm  mm
                rr   r   ee        dd    d   ll      ee        gg        gg             ss              vv vv       mm   mmm   mm
                rr    r  eeeeeeee  dddddd    llllll  eeeeeeee    gggggggg          ssssss                vvv        mm         mm 
  
*********************************************************************************************************************************************************

        `);
    }

    private printInventory() {
        this.cashRegister.printInventory();
        this.home();
    }

    private printProduct() {
        inquirer.prompt(printProductQts).then(ans => {
            const id = Number.parseInt((ans as any).id);
            if (!isNaN(id)) {
                this.cashRegister.printProduct(id);
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private printReceipts() {
        this.cashRegister.printReceipts();
        this.home();
    }

    private printSelectedProducts() {
        this.cashRegister.printReceipt();
        this.home();
    }

    private removeProducts() {
        inquirer.prompt(removeProducsQts).then(ans => {
            if ((ans as any).confirm) {
                const id = Number.parseInt((ans as any).id);
                if (!isNaN(id)) {
                    try {
                        this.cashRegister.inventory.removeProduct(id);
                    } catch (error) {
                        console.error(error.message);
                    }
                } else {
                    console.error("Invalid input; please try again");
                }
            }
            this.home();
        });
    }

    private selectProduct() {
        inquirer.prompt(selectProductQts).then(ans => {
            const id = Number.parseInt((ans as any).id);
            const quantity = Number.parseInt((ans as any).quantity);

            if (!isNaN(id) && !isNaN(quantity)) {
                this.cashRegister.selectProduct(id, quantity);
            } else {
                console.error("Invalid input; please try again");
            }

            this.home();
        });
    }

    private checkSize(val: any) {
        return val.split(",");
    }

    private startUp() {
        redleg
            .version("1.0.0")
            .description("Redleg's Vending Machine")
            .option(
                "-e, --empty",
                "Initiate Redleg's Vending Machine without prefilled inventory"
            )
            .option("-a, --admin", "Use admin rights for managing inventory")
            .option(
                "-s, --size <size>",
                "Provide <#rows,#itemsInRow> for setting size of the inventory",
                this.checkSize
            )
            .action(options => {
                this.printBrand();

                if (options.size) {
                    if (options.size.length !== 2) {
                        console.error(
                            "provide two values for setting size of the inventory; default size will be used"
                        );
                    } else {
                        const maxrows = Number.parseInt(options.size[0]);
                        const maxitems = Number.parseInt(options.size[1]);

                        if (!isNaN(maxrows) && !isNaN(maxitems)) {
                            this.cashRegister.inventory.maxRows = maxrows;
                            this.cashRegister.inventory.maxItemsPerRow = maxitems;

                            console.log(`Inventory resized to: ${maxrows} x ${maxitems}
Total size: ${this.cashRegister.inventory.size}\n`);
                        }
                    }
                }

                if (!options.empty) {
                    this.createProducts();
                    console.log("\n");
                }

                this.isAdmin = options.admin;

                this.home();
            });

        redleg.parse(process.argv);
    }
}
