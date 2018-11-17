import * as redleg from "commander";
import * as inquirer from "inquirer";
import { CashRegister } from "./../cashregister";
import {
    addBeverageQts,
    addCigaretteQts,
    addMedicineQts,
    addProductToInventoryQts,
    addSnackQts,
    removeProducsQts
} from "./questions";

import { Quantity } from "./../general";

import { Cigarette, Medicine, Snack, Beverage } from "./../products";

export class CLI {
    constructor(private cashRegister: CashRegister) {
        this.startUp();
    }

    private addProduct() {
        redleg
            .command("add")
            .alias("a")
            .description("Add product to inventory")
            .action(() => {
                inquirer.prompt(addProductToInventoryQts).then(res => {
                    switch ((res as any).class) {
                        case "Beverage":
                            this.addBeverage(res);
                            break;
                        case "Cigarette":
                            this.addCigarette(res);
                            break;
                        case "Medicine":
                            this.addMedicine(res);
                            break;
                        case "Snack":
                            this.addSnack(res);
                            break;
                    }
                });
            });
    }

    private addBeverage(props: any) {
        inquirer.prompt(addBeverageQts).then(res => {
            this.cashRegister.inventory.add(
                new Beverage(
                    props.name,
                    Number.parseFloat(props.price),
                    (res as any).brand,
                    new Quantity(
                        Number.parseInt((res as any).volumeQnt),
                        (res as any).volumeUoM
                    ),
                    (res as any).isCooled
                ),
                props.quantity
            );

            console.log(`Added ${props.name} to inventory`);
            this.cashRegister.printInventory();
        });
    }

    private addCigarette(props: any) {
        inquirer.prompt(addCigaretteQts).then(res => {
            this.cashRegister.inventory.add(
                new Cigarette(
                    props.name,
                    Number.parseFloat(props.price),
                    (res as any).brand,
                    (res as any).type,
                    new Quantity(
                        Number.parseInt((res as any).volumeQnt),
                        (res as any).volumeUoM
                    )
                ),
                props.quantity
            );

            console.log(`Added ${props.name} to inventory`);
            this.cashRegister.printInventory();
        });
    }

    private addMedicine(props: any) {
        inquirer.prompt(addMedicineQts).then(res => {
            this.cashRegister.inventory.add(
                new Medicine(
                    props.name,
                    Number.parseFloat(props.price),
                    (res as any).brand,
                    (res as any).type,
                    (res as any).illness
                ),
                props.quantity
            );

            console.log(`Added ${props.name} to inventory`);
            this.cashRegister.printInventory();
        });
    }

    private addSnack(props: any) {
        inquirer.prompt(addSnackQts).then(res => {
            this.cashRegister.inventory.add(
                new Snack(
                    props.name,
                    Number.parseFloat(props.price),
                    (res as any).category,
                    (res as any).brand,
                    (res as any).type,
                    new Quantity(
                        Number.parseInt((res as any).energyQnt),
                        (res as any).energyUoM
                    )
                ),
                props.quantity
            );

            console.log(`Added ${props.name} to inventory`);
            this.cashRegister.printInventory();
        });
    }

    private orderProduct() {
        redleg
            .command("order")
            .alias("o")
            .description("Order product")
            .option(
                "-s, --select <productId>",
                "The id of the selected products in the list",
                this.parseArgsList
            )
            .option(
                "-q, --quantity <quantity>",
                "The quantity for the selected products",
                this.parseArgsList
            )
            .option(
                "-p, --paidAmount <paidAmount>",
                "The paid amount",
                parseFloat
            )
            .option("-l, --list", "Show resulting products list")
            .action(command => {
                try {
                    // create new receipt
                    this.cashRegister.createReceipt();

                    if (command.select) {
                        command.select.forEach((id: string, idx: number) => {
                            // determine quantity
                            const quantity = command.quantity
                                ? command.quantity[idx]
                                    ? Number.parseInt(command.quantity[idx])
                                    : 1
                                : 1;

                            // select the product
                            this.cashRegister.selectProduct(
                                Number.parseInt(id),
                                quantity
                            );
                        });
                    }

                    if (command.paidAmount) {
                        // application logic: pay the amount
                        this.cashRegister.payAmount(
                            Number.parseFloat(command.paidAmount)
                        );
                    }

                    // application logic: print the receipt
                    this.cashRegister.printReceipt();

                    if (command.list) {
                        // application logic: print the updated list if requested
                        this.cashRegister.printInventory();
                    }
                } catch (error) {
                    console.log(error.message);
                }
            });
    }

    private parseArgsList(val: string) {
        return val.split(",");
    }

    private printInventoryList() {
        redleg
            .command("list")
            .alias("ls")
            .description("Print inventory list")
            .action(() => {
                this.cashRegister.printBrand();
                this.cashRegister.printInventory();
            });
    }

    private printProduct() {
        redleg
            .command("product <id>")
            .alias("pr")
            .description("Print product")
            .action(id => {
                this.cashRegister.printProduct(Number.parseInt(id));
            });
    }

    private removeProducts() {
        redleg
            .command("remove <id>")
            .alias("rm")
            .description("Remove product from inventory")
            .action(id => {
                console.log(
                    `Removing ${
                        this.cashRegister.inventory.getProduct(
                            Number.parseInt(id)
                        )[0].name
                    } from inventory`
                );
                inquirer.prompt(removeProducsQts).then(res => {
                    if ((res as any).confirm) {
                        const removedPrds = this.cashRegister.inventory.removeProduct(
                            Number.parseInt(id)
                        );
                        console.log(
                            `Removed ${removedPrds[0][1]} items of ${
                                removedPrds[0][0].name
                            }`
                        );
                    }
                });
            });
    }

    private startUp() {
        redleg.version("0.0.1").description("Redleg Vending Machine");

        this.printInventoryList();
        this.orderProduct();
        this.printProduct();

        this.addProduct();
        this.removeProducts();

        redleg.parse(process.argv);
    }
}
