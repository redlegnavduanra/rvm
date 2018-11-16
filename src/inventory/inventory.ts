import { Product, ProductLine } from "../products/product";

export class Inventory {
    private _products: Array<ProductLine>;
    private _selectedProduct: number;

    constructor(private _maxRows: number, private _maxItemsPerRow: number) {
        this._products = [];
        this._selectedProduct = -1;
    }

    get fullEmptyRows(): number {
        const totalOccupiedRows = this._products
            .map(prd => Math.ceil(prd[1] / this.maxItemsPerRow))
            .reduce((acc, cur) => acc + cur, 0);

        return this.maxRows - totalOccupiedRows;
    }

    get fullEmptyRowsSlots(): number {
        return this.fullEmptyRows * this.maxItemsPerRow;
    }

    get maxRows(): number {
        return this._maxRows;
    }

    set maxRows(maxRows: number) {
        this._maxRows = maxRows;
    }

    get maxItemsPerRow(): number {
        return this._maxItemsPerRow;
    }

    set maxItemsPerRow(maxItems: number) {
        this._maxItemsPerRow = maxItems;
    }

    get selectedProduct(): ProductLine {
        if (this._selectedProduct < 0) {
            throw Error("No product selected");
        }

        return this._products[this._selectedProduct];
    }

    get size(): number {
        return this._maxRows * this._maxItemsPerRow;
    }

    // adding a product is only allowed into complete free rows and into rows where the products already added before.
    // Two different products in the same row are not allowed
    add(product: Product, quantity: number = 1) {
        const prdIdx = this._products.findIndex(
            prd => prd[0].name === product.name
        );

        const totalFreeSlots =
            prdIdx < 0
                ? this.fullEmptyRowsSlots
                : this.fullEmptyRowsSlots +
                  (this.maxItemsPerRow -
                      (this._products[prdIdx][1] % this.maxItemsPerRow));

        if (quantity <= totalFreeSlots) {
            prdIdx < 0
                ? this._products.push([product, quantity])
                : (this._products[prdIdx][1] += quantity);
        }
    }

    getProduct(id: number): ProductLine {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot get product: invalid id provided");
        }

        return this._products[id];
    }

    printItem(id: number): string {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot print item: invalid id provided");
        }

        return "" + this._products[id];
    }

    printItems(): string {
        let result = "";
        this._products.forEach(product => (result += "\n" + product[0]));
        return result;
    }

    printList() {
        console.log("" + this);
    }

    remove(product: Product, quantity: number = 1) {
        const prdIdx = this._products.findIndex(
            prd => prd[0].name === product.name
        );

        if (prdIdx >= 0 && quantity <= this._products[prdIdx][1]) {
            this._products[prdIdx][1] -= quantity;
        }
    }

    selectProduct(id: number) {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Index out of bounds");
        }

        this._selectedProduct = id;
    }

    // render a nice output to the console
    toString(): string {
        let result = `
*********************************************************************************************************************************************************
*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tQuantity\t|\tUsed Rows\t|\tFree lots\t*
*-------------------------------------------------------------------------------------------------------------------------------------------------------*
`;
        this._products.forEach((product, idx) => {
            const prodNameTabs = 4 - product[0].name.length / 8;
            let tabs = "";
            for (let i = 0; i < prodNameTabs; i++) {
                tabs += "\t";
            }

            const availableSlots =
                product[1] % this.maxItemsPerRow > 0
                    ? this.maxItemsPerRow - (product[1] % this.maxItemsPerRow)
                    : "";

            result += `*\t${idx}\t|\t${
                product[0].name
            }${tabs}|\t€ ${product[0].price.toFixed(2)}\t\t|\t${
                product[1]
            }\t\t|\t${Math.ceil(
                product[1] / this.maxItemsPerRow
            )}\t\t|\t${availableSlots}\t\t*\n`;
        });

        result += `*********************************************************************************************************************************************************
*\tTotal Stock size: ${this.size} (${this.maxRows} rows of ${
            this.maxItemsPerRow
        } slots)\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tUsed rows: ${this.maxRows -
            this
                .fullEmptyRows}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tFree rows: ${
            this.fullEmptyRows
        }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*
*********************************************************************************************************************************************************
`;

        return result;
    }
}
