export interface Flat {
    readonly totalSpace: number[];
    readonly livingSpace: number[];
    readonly isMiddleFloor: number[];
    readonly buildYear: number[];
    readonly numRoom: number[];
    readonly kitchenSpace: number[];
    readonly subArea: number[];
    readonly metroMinWalk: number[];
    readonly kremlinKm: number[];
}

export interface Car {
    readonly brand: number[];
    readonly model: number[];
    readonly year: number[];
    readonly mileage: number[];
    readonly bodyType: number[];
    readonly fuelType: number[];
    readonly engineVolume: number[];
    readonly enginePower: number[];
    readonly transmissionType: number[];
    readonly driveType: number[];
    readonly ownersCount: number[];
}

export type PropertyAppraiserFormMode = 'car' | 'flat';
