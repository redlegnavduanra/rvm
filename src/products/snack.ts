import { Product } from "./product";
import { Energy } from "../general";

export enum SnackCategory {
    Biscuit = "Biscuit",
    Candy = "Candy",
    ChocoloteBar = "ChocolateBar",
    EnergyBar = "EnergyBar",
    PotatoChips = "Chips"
}

export enum SnackBrand {
    Haribo = "Haribo",
    Lays = "Lays",
    Liga = "Liga",
    Mars = "Mars",
    RedBand = "Red Band"
}

export enum SnackType {
    Fruitgom = "Fruitgom",
    Veggie = "Veggie",
    Drop = "Drop",
    SugarFree = "Sugar free",
    LessSugar = "Less Sugar",
    Doritos = "Doritos",
    Cheetos = "Cheetos",
    Wokkels = "Wokkels",
    Evergeen = "Evergreen",
    MilkBreak = "Milkbreak",
    Belvita = "BelVita",
    Mars = "Mars",
    Snickers = "Snickers",
    Twix = "Twix",
    Bounty = "Bounty",
    MilkyWay = "Milky Way"
}

export class Snack extends Product {
    constructor(
        protected _name: string,
        protected _price: number,
        private _category: SnackCategory,
        private _type: SnackType,
        private _brand: SnackBrand,
        private _energy: Energy
    ) {
        super(_name, _price);
    }

    get brand(): SnackBrand {
        return this._brand;
    }

    set brand(brand: SnackBrand) {
        this._brand = brand;
    }

    get category(): SnackCategory {
        return this._category;
    }

    set category(category: SnackCategory) {
        this._category = category;
    }

    get energy(): Energy {
        return this._energy;
    }

    set energy(energy: Energy) {
        this._energy = energy;
    }

    get type(): SnackType {
        return this._type;
    }

    set type(type: SnackType) {
        this._type = type;
    }

    public toString() {
        return `Name: ${this.name}; Price: ${this.price}; Category: ${
            this.category
        }; Type: ${this.type}; Brand: ${this.brand}; Energy: ${this.energy}`;
    }
}
