import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, DatePicker, Form, InputNumber, Select } from 'antd';
import { AxiosResponse } from 'axios';
import { CarBrand, CarModel } from '../model/types';
import { formatCarBrands, formatCarModels } from '../utils/utils';

interface CarAppraiserFormProps {
    getDataFromPath: (path: string) => Promise<AxiosResponse<any>>;
    setFormValues: Function;
    onChangeHandler: (value: any, parameter: string) => void;
}

const CarAppraiserForm = ({
    getDataFromPath,
    setFormValues,
    onChangeHandler
}: CarAppraiserFormProps) => {
    const [carBrands, setCarBrands] = useState<CarBrand[] | null>(null);
    const [selectedCarBrand, setSelectedCarBrand] = useState<
        CarBrand | undefined
    >(undefined);
    const [carModels, setCarModels] = useState<CarModel[] | null>(null);
    const [selectedCarModel, setSelectedCarModel] = useState<
        CarModel | undefined
    >(undefined);

    const fuelTypesArray = useMemo(
        () => [
            {
                label: 'Бензин',
                value: 1
            },
            {
                label: 'Газ',
                value: 2
            },
            {
                label: 'Дизель',
                value: 3
            },
            {
                label: 'Гибрид',
                value: 4
            }
        ],
        []
    );

    const transmissionTypesArray = useMemo(
        () => [
            {
                label: 'АКПП',
                value: 1
            },
            {
                label: 'МКПП',
                value: 2
            },
            {
                label: 'Вариатор',
                value: 3
            },
            {
                label: 'Робот',
                value: 4
            }
        ],
        []
    );

    const driveTypesArray = useMemo(
        () => [
            {
                label: 'Передний',
                value: 1
            },
            {
                label: 'Задний',
                value: 2
            },
            {
                label: 'Полный',
                value: 3
            }
        ],
        []
    );

    const bodyTypesArray = useMemo(
        () => [
            {
                label: 'Седан',
                value: 1
            },
            {
                label: 'Универсал',
                value: 2
            },
            {
                label: 'Внедорожник',
                value: 3
            },
            {
                label: 'Хэтчбэк 3-дверный',
                value: 4
            },
            {
                label: 'Хэтчбэк 4-дверный',
                value: 5
            },
            {
                label: 'Хэтчбэк 5-дверный',
                value: 6
            },
            {
                label: 'Пикап',
                value: 7
            },
            {
                label: 'Купе',
                value: 8
            },
            {
                label: 'Фастбэк',
                value: 9
            },
            {
                label: 'Кабриолет',
                value: 10
            },
            {
                label: 'Минивэн',
                value: 11
            },
            {
                label: 'Фургон',
                value: 12
            }
        ],
        []
    );

    useEffect(() => {
        !carBrands &&
            getDataFromPath('api/car/brands')
                .then((response) =>
                    setCarBrands(formatCarBrands(response.data))
                )
                .catch((error) => console.log(error.response.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        selectedCarBrand &&
            getDataFromPath(`api/car/models?brand=${selectedCarBrand.brand}`)
                .then((response) =>
                    setCarModels(formatCarModels(response.data))
                )
                .catch((error) => console.log(error.response.message));
    }, [getDataFromPath, selectedCarBrand]);

    useEffect(() => {
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            car: {
                ...prevFormValues.car,
                brand: [selectedCarBrand ? selectedCarBrand.id : 0]
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCarBrand]);

    useEffect(() => {
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            car: {
                ...prevFormValues.car,
                model: [selectedCarModel ? selectedCarModel.id : 0]
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCarModel]);

    return (
        <>
            <StyledFormItem>
                <Label>Марка</Label>
                <AutoComplete
                    placeholder="Выберите марку автомобиля"
                    options={carBrands?.map((element: CarBrand) => ({
                        value: element.brand
                    }))}
                    filterOption
                    onChange={(value: string) => {
                        const newSelectedCarBrand = carBrands?.find(
                            (element) => element.brand === value
                        );
                        setSelectedCarBrand(newSelectedCarBrand);
                        !newSelectedCarBrand && setSelectedCarModel(undefined);
                    }}
                />
            </StyledFormItem>
            <StyledFormItem>
                <Label>Модель</Label>
                <AutoComplete
                    placeholder="Выберите модель"
                    disabled={!selectedCarBrand}
                    filterOption
                    value={selectedCarModel?.model || ''}
                    options={carModels?.map((element: CarModel) => ({
                        value: element.model
                    }))}
                    onChange={(value: string) => {
                        setSelectedCarModel(
                            carModels?.find(
                                (element) => element.model === value
                            )
                        );
                    }}
                />
            </StyledFormItem>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Год выпуска</Label>
                    <DatePicker
                        placeholder="Укажите год выпуска"
                        onChange={(value) => {
                            value &&
                                setFormValues((prevFormValues: any) => ({
                                    ...prevFormValues,
                                    car: {
                                        ...prevFormValues.car,
                                        year: [+value.year()]
                                    }
                                }));
                        }}
                        picker="year"
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Пробег, км</Label>
                    <InputNumber
                        placeholder="Укажите пробег"
                        min={1}
                        max={999999}
                        onChange={(value) => {
                            onChangeHandler(value, 'mileage');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Число владельцев</Label>
                    <InputNumber
                        placeholder="Укажите число владельцев"
                        min={1}
                        max={10}
                        onChange={(value) => {
                            onChangeHandler(value, 'owners_count');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Объем двигателя, л</Label>
                    <InputNumber
                        placeholder="Укажите объем двигателя"
                        min={0.5}
                        max={9}
                        onChange={(value) => {
                            onChangeHandler(value, 'engine_volume');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Мощность двигателя, л.с.</Label>
                    <InputNumber
                        placeholder="Укажите мощность двигателя"
                        min={18}
                        max={720}
                        onChange={(value) => {
                            onChangeHandler(value, 'engine_power');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Тип кузова</Label>
                    <Select
                        placeholder="Выберите тип кузова"
                        optionLabelProp="label"
                        options={bodyTypesArray}
                        onChange={(value) => {
                            onChangeHandler(value, 'body_type');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Тип топлива</Label>
                    <Select
                        placeholder="Выберите тип топлива"
                        optionLabelProp="label"
                        options={fuelTypesArray}
                        onChange={(value) => {
                            onChangeHandler(value, 'fuel_type');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Коробка передач</Label>
                    <Select
                        placeholder="Выберите коробку передач"
                        optionLabelProp="label"
                        options={transmissionTypesArray}
                        onChange={(value) => {
                            onChangeHandler(value, 'transmission_type');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Привод</Label>
                    <Select
                        placeholder="Выберите привод"
                        optionLabelProp="label"
                        options={driveTypesArray}
                        onChange={(value) => {
                            onChangeHandler(value, 'drive_type');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
        </>
    );
};

const StyledFormItem = styled(Form.Item)`
    flex: 1;
    .ant-form-item-control-input-content {
        display: flex;
        flex-direction: column;
    }
    .ant-input-number {
        width: 100%;
    }
    .ant-select-selector,
    .ant-picker,
    .ant-input,
    .ant-input-number {
        margin-top: 6px;
    }
`;

const InlineContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    .ant-form-item:not(:last-child) {
        margin-right: 32px;
    }
`;

const Label = styled.span`
    font-size: 16px;
`;

export default CarAppraiserForm;
