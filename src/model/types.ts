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
    readonly body_type: number[];
    readonly fuel_type: number[];
    readonly engine_volume: number[];
    readonly engine_power: number[];
    readonly transmission_type: number[];
    readonly drive_type: number[];
    readonly owners_count: number[];
}

export type PropertyAppraiserFormModeType = 'car' | 'flat';

export enum PropertyAppraiserFormMode {
    CAR = 'car',
    FLAT = 'flat'
}

export interface CarBrand {
    readonly brand: string;
    readonly id: number;
}

export interface CarModel {
    readonly model: string;
    readonly id: number;
}
