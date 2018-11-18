import { Product } from "./product";
import { Quantity, Brand, SnackCategory, SnackType } from "./../general";

export class Snack extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        private _category: SnackCategory,
        protected _brand: Brand,
        private _type: SnackType,
        private _energy: Quantity
    ) {
        super(_name, _price, _brand);
    }

    get category(): SnackCategory {
        return this._category;
    }

    set category(category: SnackCategory) {
        this._category = category;
    }

    get energy(): Quantity {
        return this._energy;
    }

    set energy(energy: Quantity) {
        this._energy = energy;
    }

    get type(): SnackType {
        return this._type;
    }

    set type(type: SnackType) {
        this._type = type;
    }

    toString() {
        return `\n
*****************************************************************
*\t\t\tSnack\t\t\t\t\t*
*****************************************************************
\tName: ${this.name}
        
\tPrice: ${this.price.toFixed(2)}
\tBrand: ${this.brand}
\tCategory: ${this.category}
\tType: ${this.type}
\tEnergy: ${this.energy}
*****************************************************************`;

        //     `Name: ${this.name}; Price: ${this.price}; Category: ${
        //     this.category
        // }; Type: ${this.type}; Brand: ${this.brand}; Energy: ${this.energy}`;
    }
}
