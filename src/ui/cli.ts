import * as redleg from "commander";
import { CashRegister } from "./../cashregister";
import { Inventory } from "./../inventory";

export class CLI {
    constructor(
        private inventory: Inventory,
        private cashRegister: CashRegister
    ) {
        this.startUp();
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
                    // application logic: create new receipt
                    this.cashRegister.createReceipt();

                    if (command.select) {
                        command.select.forEach((id: string, idx: number) => {
                            // determine quantity
                            const quantity = command.quantity
                                ? command.quantity[idx]
                                    ? Number.parseInt(command.quantity[idx])
                                    : 1
                                : 1;

                            // application logic: select in the inventory and add to the receipt
                            this.inventory.selectProduct(Number.parseInt(id));
                            this.cashRegister.addProduct(
                                this.inventory.selectedProduct[0],
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
                    this.cashRegister.receipt.printReceipt();

                    if (command.list) {
                        // application logic: print the updated list if requested
                        this.inventory.printList();
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
                this.inventory.printList();
            });
    }

    private startUp() {
        redleg.version("0.0.1").description("Redleg Vending Machine");

        this.printInventoryList();
        this.orderProduct();

        redleg.parse(process.argv);
    }
}
