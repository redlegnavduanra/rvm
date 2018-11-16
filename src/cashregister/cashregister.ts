import { Receipt } from "./receipt";
import { Product } from "./../products";
import { Inventory } from "../inventory";

export class CashRegister {
    private _receipts: Receipt[];

    constructor(private _inventory: Inventory) {
        this._receipts = [];
    }

    get receipt(): Receipt {
        if (this.receipts.length === 0) {
            throw Error("Cannot get receipt: no receipt initialized");
        }

        return this.receipts[this.receipts.length - 1];
    }

    get receipts(): Receipt[] {
        return this._receipts;
    }

    addProduct(product: Product, quantity: number = 1) {
        this.receipt.addProduct(product, quantity);
    }

    createReceipt() {
        this.receipts.push(new Receipt());
    }

    payAmount(amount: number) {
        this.receipt.payAmount(amount);

        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(prd => {
                this._inventory.remove(prd[0], prd[1]);
            });
        }
    }

    removeProduct(product: Product, quantity: number = 1) {
        this.receipt.removeProduct(product, quantity);
    }
}
