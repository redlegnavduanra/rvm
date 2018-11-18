import { Product, ProductLine } from "../products/product";

export class Inventory {
    private _products: ProductLine[];
    private _selectedProducts: number[];

    constructor(private _maxRows: number, private _maxItemsPerRow: number) {
        this._products = [];
        this._selectedProducts = [];
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

    get selectedProducts(): ProductLine[] {
        return this._selectedProducts.map(id => this._products[id]);
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

            this.printSuccess(`Succesfully added ${product.name} to inventory`);
        } else {
            this.printError(
                `Error adding ${product.name}: no rows available. ${
                    product.name
                } not added`
            );
        }
    }

    cancelSelection() {
        this.selectedProducts.splice(0);
    }

    deliver(product: Product, quantity: number = 1) {
        const prdIdx = this._products.findIndex(
            prd => prd[0].name === product.name
        );

        if (prdIdx >= 0 && quantity <= this._products[prdIdx][1]) {
            this._products[prdIdx][1] -= quantity;
            this.printSuccess(
                `\n\nSuccesfully delivered ${quantity} ${product.name}\n\n`
            );
        }
    }

    getProduct(id: number): ProductLine {
        if (id < 0 || id >= this._products.length) {
            this.printError("Cannot get product: invalid id provided");
        }

        return this._products[id];
    }

    printItem(id: number) {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot print item: invalid id provided");
        }

        console.log("" + this._products[id][0]);
        console.log(`*\t\t\tIn Stock: ${this._products[id][1]}\t\t\t\t*
*****************************************************************
`);
    }

    printItems() {
        let result = "";
        this._products.forEach(product => (result += "\n" + product[0]));
        console.log(result);
    }

    printList() {
        console.log("" + this);
    }

    private printSuccess(message: string) {
        console.log(message);
    }

    private printError(message: string) {
        console.error(message);
    }

    removeProduct(id: number): ProductLine[] {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Cannot remove item: invalid id provided");
        }

        this.printSuccess(
            `\n\nSuccesfully removed ${
                this._products[id][0].name
            } from inventory\n\n`
        );
        return this._products.splice(id, 1);
    }

    selectProduct(id: number) {
        if (id < 0 || id >= this._products.length) {
            throw new Error("Index out of bounds");
        }

        if (!this._selectedProducts[id]) {
            this._selectedProducts.push(id);
        }
    }

    toString(): string {
        let result = `
        
*********************************************************************************************************************************************************
*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tIn Stock\t|\tUsed Rows\t|\tFree Slots\t*
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
*\tTotal inventory size: ${this.size} (${this.maxRows} rows of ${
            this.maxItemsPerRow
        } slots)\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tUsed rows: ${this.maxRows -
            this
                .fullEmptyRows}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*\n*\tFree rows: ${
            this.fullEmptyRows
        }\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t*
*********************************************************************************************************************************************************\n\n`;

        return result;
    }
}
