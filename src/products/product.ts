export abstract class Product {
    constructor(protected _name: string, protected _price: number) {}

    /* Getters and Setters */

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    // render a nice output to the console
    public abstract toString(): string;
}
