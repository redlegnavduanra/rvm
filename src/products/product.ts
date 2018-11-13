export class Product {
    // static id for generating unique id's
    // should be a GUID e.g. in real production code
    static id = 0;

    readonly _id: number;

    constructor(private _name: string, private _price: number) {
        this._id = Product.id;
        Product.id++;
    }

    /* Getters and Setters */
    get id(): number {
        return this._id;
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
    public toString(): string {
        return `\nid: ${this.id}; Name: ${this.name}; Price: ${this.price}`;
    }
}
