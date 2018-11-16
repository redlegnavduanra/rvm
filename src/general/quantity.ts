import { UnitOfMeasurement } from "./enums";

export class Quantity {
    constructor(
        private amount: number,
        private unitOfMeasurement: UnitOfMeasurement
    ) {}

    public toString(): string {
        return `${this.amount} ${this.unitOfMeasurement}`;
    }
}
