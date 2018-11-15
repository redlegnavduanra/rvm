import { Product } from "./product";

export enum CigarreteBrand {
    Camel = "Camel",
    Davidoff = "Davidoff",
    Kent = "Kent",
    Marlboro = "Marlboro"
}

export enum CigarreteType {
    Light = "Light",
    Menthol = "Menthol",
    Normal = "Normal"
}

export class Cigarrete extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        private _brand: CigarreteBrand,
        private _type: CigarreteType = CigarreteType.Normal,
        private _volume: number = 12
    ) {
        super(_name, _price);
    }

    get brand(): CigarreteBrand {
        return this._brand;
    }

    set brand(brand: CigarreteBrand) {
        this._brand = brand;
    }

    get type(): CigarreteType {
        return this._type;
    }

    set type(type: CigarreteType) {
        this._type = type;
    }

    get volume(): number {
        return this._volume;
    }

    set volume(volume: number) {
        this._volume = volume;
    }

    // render a nice output to the console
    public toString(): string {
        return `Name: ${this.name}; Price: ${this.price}; Brand: ${
            this.brand
        }; Volume: ${this._volume}; Type: ${this.type}`;
    }
}
