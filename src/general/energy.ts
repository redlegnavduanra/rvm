export enum UnitOfMeasurement {
    Joule = "J",
    KiloJoule = "KJ",
    Calorie = "Cal",
    KiloCalorie = "KCal"
}

export class Energy {
    constructor(
        private amount: number,
        private unitOfMeasurement: UnitOfMeasurement
    ) {}

    public toString(): string {
        return `${this.amount} ${this.unitOfMeasurement}`;
    }
}
