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
import FlatAppraiserForm from './flat-appraiser-form';

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
            total_space: [0],
            living_space: [0],
            is_middle_floor: [0],
            build_year: [0],
            num_room: [0],
            kitchen_space: [0],
            sub_area: [0],
            metro_min_walk: [0],
            kremlin_km: [0]
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
                    <FlatAppraiserForm
                        getDataFromPath={getDataFromPath}
                        setFormValues={setFormValues}
                        onChangeHandler={(value, parameter) =>
                            onChangeHandler(value, parameter, 'flat')
                        }
                    />
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
