import { Product } from "../products/product";

export class Inventory {
    // in memory db, should be persisted in nosql/sql db in production code
    private products: Array<[Product, number]>;

    constructor() {
        this.products = [];
    }

    // add the product to the inventory
    public add(product: Product, quantity: number = 1) {
        if (this.products.find(prd => prd[0].name === product.name)) {
            return;
        }

        this.products.push([product, quantity]);
    }

    // render a nice output to the console
    public printList(): string {
        let result = `
*********************************************************************************************************
*\tid\t|\tName\t\t\t\t|\tPrice\t\t|\tQuantity\t*
*-------------------------------------------------------------------------------------------------------*
`;
        this.products.forEach((product, idx) => {
            result += `*\t${idx}\t|\t${product[0].name}\t\t\t|\t€ ${
                product[0].price
            }\t\t|\t${product[1]}\t\t*\n`;
        });

        result += `*********************************************************************************************************`;

        return result;
    }
}
