import { ProductLine, Product } from "./../products";
import { ReceiptStatus } from "./../general";

export class Receipt {
    private _receiptLines: ProductLine[];
    private _status: ReceiptStatus;
    private _totalPaidAmount: number;
    private _totalPayableAmount: number;

    constructor() {
        this._receiptLines = [];
        this._status = ReceiptStatus.Concept;
        this._totalPaidAmount = 0;
        this._totalPayableAmount = 0;
    }

    get products(): ProductLine[] {
        return this._receiptLines;
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
    }

    finalize() {
        this.status = ReceiptStatus.Closed;
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
    }

    payAmount(amount: number) {
        this._totalPaidAmount += amount;
    }

    printReceipt() {
        console.log("" + this);
    }

    toString(): string {
        const title =
            this.status === ReceiptStatus.Closed
                ? ` YOUR PURCHASE`
                : `    YOUR ORDER`;
        let result = `\n
*****************************************************************
*\t\t\t${title}\t\t\t\t*
*****************************************************************
`;

        this._receiptLines.forEach(prd => {
            const prodName =
                prd[0].name.length < 10 ? `${prd[0].name}\t` : `${prd[0].name}`;
            result += `*   ${prodName}\t${prd[1]}\t€ ${prd[0].price.toFixed(
                2
            )}\t\t€ ${(prd[1] * prd[0].price).toFixed(2)}\t\t*\n`;
        });

        result += `*\t\t\t\t\t\t\t\t*
*\t\t\t\t\t\t\t\t*
*   Total:\t\t\t\t\t€ ${this.totalPayableAmount.toFixed(2)}\t\t*
*---------------------------------------------------------------*
*   Paid:\t\t\t\t\t€ ${this.totalPaidAmount.toFixed(2)}\t\t*`;

        result +=
            this.totalPaidAmount - this.totalPayableAmount >= 0
                ? `\n*   Change:\t\t\t\t\t€ ${(
                      this.totalPaidAmount - this.totalPayableAmount
                  ).toFixed(2)}\t\t*`
                : ``;
        result += `
*****************************************************************\n\n`;
        return result;
    }
}
