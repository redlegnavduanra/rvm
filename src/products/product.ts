import { Brand } from "./../general";

export type ProductLine = [Product, number];

export abstract class Product {
    constructor(
        protected _name: string,
        protected _price: number,
        protected _brand: Brand
    ) {}

    /* Getters and Setters */

    get brand(): Brand {
        return this._brand;
    }

    set brand(brand: Brand) {
        this._brand = brand;
    }

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
    abstract toString(): string;
}
