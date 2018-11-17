import { Receipt } from "./receipt";
import { Product } from "./../products";
import { Inventory } from "../inventory";

export class CashRegister {
    private _receipts: Receipt[];

    constructor(private _inventory: Inventory) {
        this._receipts = [];
    }

    get inventory(): Inventory {
        return this._inventory;
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

    selectProduct(id: number, quantity: number = 1) {
        this.inventory.selectProduct(id);
        this.receipt.addProduct(this.inventory.getProduct(id)[0], quantity);
    }

    createReceipt() {
        this.receipts.push(new Receipt());
    }

    payAmount(amount: number) {
        this.receipt.payAmount(amount);

        if (this.receipt.totalPaidAmount >= this.receipt.totalPayableAmount) {
            this.receipt.products.forEach(prd => {
                this.inventory.remove(prd[0], prd[1]);
            });
        }
    }

    printBrand() {
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

    printInventory() {
        this.inventory.printList();
    }

    printProduct(id: number) {
        this.inventory.printItem(id);
    }

    printReceipt() {
        this.receipt.printReceipt();
    }

    removeProduct(product: Product, quantity: number = 1) {
        this.receipt.removeProduct(product, quantity);
    }
}
