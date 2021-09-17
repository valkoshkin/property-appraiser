export interface Flat {
    readonly total_space: number[];
    readonly living_space: number[];
    readonly is_middle_floor: number[];
    readonly build_year: number[];
    readonly num_room: number[];
    readonly kitchen_space: number[];
    readonly sub_area: number[];
    readonly metro_min_walk: number[];
    readonly kremlin_km: number[];
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

export interface Area {
    readonly name: string;
    readonly id: number;
}
