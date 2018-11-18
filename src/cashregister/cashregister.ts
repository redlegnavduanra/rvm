import { Receipt } from "./receipt";
import { Product } from "./../products";
import { Inventory } from "../inventory";
import { ReceiptStatus } from "../general";

export class CashRegister {
    private _receipts: Receipt[];

    constructor(private _inventory: Inventory) {
        this._receipts = [];
    }

    get inventory(): Inventory {
        return this._inventory;
    }

    get receipt(): Receipt {
        return this.receipts[this.receipts.length - 1];
    }

    get receipts(): Receipt[] {
        return this._receipts;
    }

    cancelReceipt() {
        if (this.receipt) {
            this.receipts.splice(this.receipts.length - 1, 1);
            this.inventory.cancelSelection();
        }
    }

    createReceipt() {
        this.receipts.push(new Receipt());
    }

    finalize() {
        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(prd => {
                this.inventory.deliver(prd[0], prd[1]);
            });

            this.receipt.finalize();
        }
    }

    payAmount(amount: number) {
        if (!this.receipt || this.receipt.status === ReceiptStatus.Closed) {
            this.createReceipt();
        }

        this.receipt.payAmount(amount);

        const remainingAmount =
            this.receipt.totalPayableAmount > this.receipt.totalPaidAmount
                ? `Remaining amount:\t${(
                      this.receipt.totalPayableAmount -
                      this.receipt.totalPaidAmount
                  ).toFixed(2)}`
                : `Change:\t\t\t${(
                      this.receipt.totalPaidAmount -
                      this.receipt.totalPayableAmount
                  ).toFixed(
                      2
                  )}\n\nPlease finish transaction to get your products`;
        this.printSuccess(
            `\n\nSuccesfully paid:\t${amount.toFixed(
                2
            )}\n${remainingAmount}\n\n`
        );
    }

    printInventory() {
        this.inventory.printList();
    }

    printProduct(id: number) {
        try {
            this.inventory.printItem(id);
        } catch (error) {
            this.printError(error.message);
        }
    }

    printReceipt() {
        this.receipt.printReceipt();
    }

    printReceipts() {
        this.receipts.forEach(receipt => receipt.printReceipt());
    }

    private printSuccess(message: string) {
        console.log(message);
    }

    private printError(message: string) {
        console.error(message);
    }

    removeProduct(product: Product, quantity: number = 1) {
        this.receipt.removeProduct(product, quantity);
    }

    selectProduct(id: number, quantity: number = 1) {
        try {
            const selectedPrd = this.inventory.getProduct(id);
            const receiptPrd = this.receipt
                ? this.receipt.products.find(
                      prd => prd[0].name === selectedPrd[0].name
                  )
                : null;
            const totalQuantity = receiptPrd
                ? receiptPrd[1] + quantity
                : quantity;

            if (totalQuantity > selectedPrd[1]) {
                this.printError(
                    `\n\nCannot provide ${quantity} ${
                        selectedPrd[0].name
                    }, only ${selectedPrd[1]} in stock\n\n`
                );
                return;
            }

            if (!this.receipt || this.receipt.status === ReceiptStatus.Closed) {
                this.createReceipt();
            }

            this.inventory.selectProduct(id);
            this.receipt.addProduct(selectedPrd[0], quantity);

            this.printSuccess(
                `\n\nSuccesfully selected ${quantity} of ${
                    selectedPrd[0].name
                }\tPrice: ${selectedPrd[0].price.toFixed(2)}\tTotal: ${(
                    selectedPrd[0].price * quantity
                ).toFixed(2)}\n\n`
            );
        } catch (error) {
            this.printError(error.message);
        }
    }
}
