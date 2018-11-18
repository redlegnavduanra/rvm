import { Product } from "./product";
import { Brand, Illness, MedicineType } from "./../general";

export class Medicine extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        protected _brand: Brand,
        private _type: MedicineType,
        private _illness: Illness[]
    ) {
        super(_name, _price, _brand);
    }

    get illness(): Illness[] {
        return this._illness;
    }

    set illness(illness: Illness[]) {
        this._illness = illness;
    }

    get type(): MedicineType {
        return this._type;
    }

    set type(type: MedicineType) {
        this._type = type;
    }

    addIllness(illness: Illness) {
        if (this._illness.find(itm => itm === illness)) {
            return;
        }

        this._illness.push(illness);
    }

    removeIllness(illness: Illness) {
        const illnessIdx = this._illness.findIndex(itm => itm === illness);
        if (illnessIdx > -1) {
            this._illness.splice(illnessIdx, 1);
        }
    }

    toString(): string {
        return `\n
*****************************************************************
*\t\t\tMedicine\t\t\t\t*
*****************************************************************
\tName: ${this.name}\tType: ${this.type}
        
\tPrice: ${this.price.toFixed(2)}
\tBrand: ${this.brand}
\tUse for: ${this.illness}
*****************************************************************`;

        //     `Name: ${this.name}; Price: ${this.price}; Type: ${
        //     this.type
        // }; Applicable for: ${this.illness} `;
    }
}
