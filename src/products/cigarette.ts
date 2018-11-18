import { Product } from "./product";
import {
    Brand,
    CigarreteType,
    Quantity,
    UnitOfMeasurement
} from "./../general";

export class Cigarette extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        protected _brand: Brand,
        private _type: CigarreteType = CigarreteType.Normal,
        private _volume: Quantity = new Quantity(12, UnitOfMeasurement.Unit)
    ) {
        super(_name, _price, _brand);
    }

    get brand(): Brand {
        return this._brand;
    }

    set brand(brand: Brand) {
        this._brand = brand;
    }

    get type(): CigarreteType {
        return this._type;
    }

    set type(type: CigarreteType) {
        this._type = type;
    }

    get volume(): Quantity {
        return this._volume;
    }

    set volume(volume: Quantity) {
        this._volume = volume;
    }

    // render a nice output to the console
    toString(): string {
        return `\n
*****************************************************************
*\t\t\tCigarettes\t\t\t\t*
*****************************************************************
\tName: ${this.name}\tType: ${this.type}
        
\tPrice: ${this.price.toFixed(2)}
\tBrand: ${this.brand}
\tVolume: ${this.volume}
*****************************************************************`;
    }
}
