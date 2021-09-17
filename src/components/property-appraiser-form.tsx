import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Form } from 'antd';
import axios from 'axios';
import {
    Car,
    Flat,
    PropertyAppraiserFormMode,
    PropertyAppraiserFormModeType
} from '../model/types';
import CarAppraiserForm from './car-appraiser-form';

const urlConfig = require('../routes.json');

const { proxyUrl, serverUrl } = urlConfig;

interface PropertyAppraiserFormProps {
    mode: PropertyAppraiserFormModeType;
}

const PropertyAppraiserForm = ({ mode }: PropertyAppraiserFormProps) => {
    const [formValues, setFormValues] = useState<{ car: Car; flat: Flat }>({
        car: {
            brand: [0],
            model: [0],
            year: [0],
            mileage: [0],
            body_type: [0],
            fuel_type: [0],
            engine_volume: [0],
            engine_power: [0],
            transmission_type: [0],
            drive_type: [0],
            owners_count: [0]
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

    const getDataFromPath = useCallback(async (path: string) => {
        return axios.get(`${proxyUrl}${serverUrl}${path}`);
    }, []);

    const postDataToPath = useCallback((path, data) => {
        return axios.post(`${proxyUrl}${serverUrl}${path}`, data);
    }, []);

    const onChangeHandler = useCallback((value, parameter, entity) => {
        value &&
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [entity]: {
                    ...(prevFormValues as any)[entity],
                    [parameter]: [+value]
                }
            }));
    }, []);

    return (
        <Container>
            <Form>
                {mode === PropertyAppraiserFormMode.CAR ? (
                    <CarAppraiserForm
                        getDataFromPath={getDataFromPath}
                        setFormValues={setFormValues}
                        onChangeHandler={(value, parameter) =>
                            onChangeHandler(value, parameter, 'car')
                        }
                    />
                ) : (
                    <>flat</>
                )}
            </Form>
            <Button
                onClick={() => {
                    postDataToPath('api/car', formValues.car).then((response) =>
                        console.log(response)
                    );
                }}
            >
                SEND
            </Button>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

export default PropertyAppraiserForm;
