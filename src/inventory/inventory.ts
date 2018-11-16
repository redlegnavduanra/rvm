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
            console.log(
                "Inventory: Added " + quantity + " items of " + product.name
            );
        } else {
            console.error(
                "Inventory: Cannot add " +
                    quantity +
                    " items of " +
                    product.name +
                    ", because you there are only " +
                    totalFreeSlots +
                    " slots available"
            );
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

    remove(product: Product, quantity: number = 1) {
        const prdIdx = this._products.findIndex(
            prd => prd[0].name === product.name
        );

        if (prdIdx < 0) {
            console.error(`Inventory: Cannot find product ${product.name}`);
        } else {
            if (quantity > this._products[prdIdx][1]) {
                console.error(
                    `Inventory: Cannot remove ${quantity} ${
                        product.name
                    }; only ${this._products[prdIdx][1]} available`
                );
            } else {
                this._products[prdIdx][1] -= quantity;
                console.log(
                    `Inventory: ${quantity} ${product.name} removed; ${
                        this._products[prdIdx][1]
                    } remaining`
                );
            }
        }
    }

    selectProduct(name: string) {
        this._selectedProduct = this._products.findIndex(
            prd => prd[0].name === name
        );
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

            result += `*\t${idx}\t|\t${product[0].name}${tabs}|\t€ ${
                product[0].price
            }\t\t|\t${product[1]}\t\t|\t${Math.ceil(
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
