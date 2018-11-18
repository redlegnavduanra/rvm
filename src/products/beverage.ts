import { Product } from "./product";
import { Brand, Quantity } from "./../general";

export class Beverage extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        protected _brand: Brand,
        private _volume: Quantity,
        private _isCooled: boolean
    ) {
        super(_name, _price, _brand);
    }

    get isCooled(): boolean {
        return this._isCooled;
    }

    set isCooled(isCooled: boolean) {
        this._isCooled = isCooled;
    }

    get volume(): Quantity {
        return this._volume;
    }

    set volume(volume: Quantity) {
        this._volume = volume;
    }

    toString(): string {
        return `\n
*****************************************************************
*\t\t\tBeverage\t\t\t\t*
*****************************************************************
\tName: ${this.name}
        
\tPrice: ${this.price.toFixed(2)}
\tBrand: ${this.brand}
\tVolume: ${this.volume}
\tCooled: ${this.isCooled}
*****************************************************************`;
    }
}
