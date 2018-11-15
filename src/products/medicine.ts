import { Product } from "./product";

export enum MedicineType {
    BandAid = "Band aid",
    Bandage = "Bandage",
    Paracetamol = "Paracetamol"
}

export enum Illness {
    Fever = "Fever",
    Migraine = "Migraine",
    Earache = "Earache",
    BrokenArm = "Broken arm",
    Wound = "Wound"
}

export class Medicine extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        private _type: MedicineType,
        private _illness: Illness[]
    ) {
        super(_name, _price);
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
        return `Name: ${this.name}; Price: ${this.price}; Type: ${
            this.type
        }; Apply by: ${this.illness} `;
    }
}
