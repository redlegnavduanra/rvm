import { Product } from "./product";
import {
    Brand,
    CigarreteType,
    Quantity,
    UnitOfMeasurement
} from "./../general";

export class Cigarrete extends Product {
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
        return `Name: ${this.name}; Price: ${this.price}; Brand: ${
            this.brand
        }; Volume: ${this._volume}; Type: ${this.type}`;
    }
}
