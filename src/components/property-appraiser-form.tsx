import React, { useState } from 'react';
import styled from 'styled-components';
import { Car, Flat, PropertyAppraiserFormMode } from '../model/types';

interface PropertyAppraiserFormProps {
    mode: PropertyAppraiserFormMode;
}

const PropertyAppraiserForm = ({ mode }: PropertyAppraiserFormProps) => {
    const [formValues, setFormValues] = useState<{ car: Car; flat: Flat }>({
        car: {
            brand: [0],
            model: [0],
            year: [0],
            mileage: [0],
            bodyType: [0],
            fuelType: [0],
            engineVolume: [0],
            enginePower: [0],
            transmissionType: [0],
            driveType: [0],
            ownersCount: [0]
        },
        flat: {
            totalSpace: [0],
            livingSpace: [0],
            isMiddleFloor: [0],
            buildYear: [0],
            numRoom: [0],
            kitchenSpace: [0],
            subArea: [0],
            metroMinWalk: [0],
            kremlinKm: [0]
        }
    });

    return <Container>{`Форма с данными в режиме: ${mode}`}</Container>;
};

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

export default PropertyAppraiserForm;
