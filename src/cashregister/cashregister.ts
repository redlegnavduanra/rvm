import { PaymentMethod } from "./paymentMethod";
import { Receipt } from "./receipt";
import { Product } from "./../products";
import { ReceiptStatus } from "../general";

export class CashRegister {
    private _paymentMethod: PaymentMethod | null;
    private _receipts: Receipt[];

    constructor() {
        this._receipts = [];
        this._paymentMethod = null;
    }

    get paymentMethod(): PaymentMethod {
        if (!this._paymentMethod) {
            throw Error("Cannot get paymentMethod: no receipt initialized");
        }

        return this._paymentMethod;
    }
    set paymentMethod(paymentMethod: PaymentMethod) {
        this._paymentMethod = paymentMethod;
    }

    get receipt(): Receipt {
        if (
            this.receipts.length === 0 ||
            this.receipts[this.receipts.length - 1].status ===
                ReceiptStatus.Closed
        ) {
            throw Error("Cannot get receipt: no receipt initialized");
        }

        return this.receipts[this.receipts.length - 1];
    }

    get receipts(): Receipt[] {
        return this._receipts;
    }

    addProduct(product: Product, quantity: number = 1) {
        this.receipt.addProduct(product, quantity);
        console.log(
            `CashRegister: Added ${quantity} ${product.name}: Price ${
                product.price
            }; Total payable amount: ${this.receipt.totalPayableAmount}`
        );
    }

    createReceipt() {
        this.receipts.push(new Receipt());
    }

    payAmount(amount: number) {
        this.receipt.payAmount(amount);
        console.log(
            `CashRegister: Total payable amount: ${
                this.receipt.totalPayableAmount
            }; Paid amount: ${amount}; Total paid amount: ${
                this.receipt.totalPaidAmount
            }; Change: ${this.receipt.totalPaidAmount -
                this.receipt.totalPayableAmount}`
        );
    }

    removeProduct(product: Product, quantity: number = 1) {
        this.receipt.removeProduct(product, quantity);
        console.log(
            `CashRegister: Removed ${quantity} ${
                product.name
            }; Total payable amount: ${this.receipt.totalPayableAmount}`
        );
    }
}
