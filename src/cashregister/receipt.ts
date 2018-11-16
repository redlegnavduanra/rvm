import { ProductLine, Product } from "./../products";
import { ReceiptStatus } from "../general";

export class Receipt {
    private _receiptLines: Array<ProductLine>;
    private _status: ReceiptStatus;
    private _totalPaidAmount: number;
    private _totalPayableAmount: number;

    constructor() {
        this._receiptLines = [];
        this._status = ReceiptStatus.Concept;
        this._totalPaidAmount = 0;
        this._totalPayableAmount = 0;
    }

    get status(): ReceiptStatus {
        return this._status;
    }

    set status(status: ReceiptStatus) {
        this._status = status;
    }

    get totalPaidAmount(): number {
        return this._totalPaidAmount;
    }

    set totalPaidAmount(amount: number) {
        this._totalPaidAmount = amount;
    }

    get totalPayableAmount(): number {
        return this._totalPayableAmount;
    }

    set totalPayableAmount(amount: number) {
        this._totalPayableAmount = amount;
    }

    addProduct(product: Product, quantity: number = 1) {
        const prdIdx = this._receiptLines.findIndex(
            prd => prd[0].name === product.name
        );

        if (prdIdx > -1) {
            this._receiptLines[prdIdx][1] += quantity;
        } else {
            this._receiptLines.push([product, quantity]);
        }

        this.totalPayableAmount += quantity * product.price;
        console.log(`Receipt: added product: ${this._receiptLines.length}`);
    }

    removeProduct(product: Product, quantity: number = 1) {
        const prdIdx = this._receiptLines.findIndex(
            prd => prd[0].name === product.name
        );

        if (prdIdx > -1) {
            this._receiptLines[prdIdx][1] - quantity === 0
                ? this._receiptLines.splice(prdIdx, 1)
                : (this._receiptLines[prdIdx][1] -= quantity);
            this.totalPayableAmount -= quantity * product.price;
        }

        console.log(`Receipt: removed product: ${this._receiptLines.length}`);
    }

    payAmount(amount: number) {
        this._totalPaidAmount += amount;
    }

    toString(): string {
        let result = ``;

        return result;
    }
}
