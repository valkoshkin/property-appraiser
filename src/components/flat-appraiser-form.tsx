import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, DatePicker, Form, InputNumber, Switch } from 'antd';
import { AxiosResponse } from 'axios';
import { Area } from '../model/types';
import { formatFlatAreas } from '../utils/utils';

interface FlatAppraiserFormProps {
    getDataFromPath: (path: string) => Promise<AxiosResponse<any>>;
    setFormValues: Function;
    onChangeHandler: (value: any, parameter: string) => void;
}

const FlatAppraiserForm = ({
    getDataFromPath,
    setFormValues,
    onChangeHandler
}: FlatAppraiserFormProps) => {
    const [areas, setAreas] = useState<Area[] | null>(null);
    const [selectedArea, setSelectedArea] = useState<Area | undefined>(
        undefined
    );
    const [isNotMiddleFloor, setIsNotMiddleFloor] = useState<boolean>(false);

    useEffect(() => {
        !areas &&
            getDataFromPath('api/flat/areas')
                .then((response) => setAreas(formatFlatAreas(response.data)))
                .catch((error) => console.log(error.response.message));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            flat: {
                ...prevFormValues.flat,
                sub_area: [selectedArea ? selectedArea.id : 0]
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedArea]);

    useEffect(() => {
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            flat: {
                ...prevFormValues.flat,
                is_middle_floor: [isNotMiddleFloor ? 0 : 1]
            }
        }));
    }, [isNotMiddleFloor, setFormValues]);

    return (
        <>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Общая площадь</Label>
                    <InputNumber
                        min={1}
                        max={999999}
                        onChange={(value) => {
                            onChangeHandler(value, 'total_space');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Жилая площадь</Label>
                    <InputNumber
                        min={1}
                        max={999999}
                        onChange={(value) => {
                            onChangeHandler(value, 'living_space');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Площадь кухни</Label>
                    <InputNumber
                        min={1}
                        max={999999}
                        onChange={(value) => {
                            onChangeHandler(value, 'kitchen_space');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <StyledFormItem>
                <Label>Район</Label>
                <AutoComplete
                    placeholder="Выберите район Москвы"
                    options={areas?.map((element: Area) => ({
                        value: element.name
                    }))}
                    filterOption
                    onChange={(value: string) => {
                        const newSelectedArea = areas?.find(
                            (element) => element.name === value
                        );
                        setSelectedArea(newSelectedArea);
                    }}
                />
            </StyledFormItem>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Пешком до ближайшей станции метро, мин</Label>
                    <InputNumber
                        min={1}
                        max={180}
                        onChange={(value) => {
                            onChangeHandler(value, 'metro_min_walk');
                        }}
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Расстояние до центра, км</Label>
                    <InputNumber
                        min={0}
                        max={100}
                        onChange={(value) => {
                            onChangeHandler(value, 'kremlin_km');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <InlineContainer>
                <StyledFormItem>
                    <Label>Год постройки</Label>
                    <DatePicker
                        placeholder="Год постройки"
                        onChange={(value) => {
                            value &&
                                setFormValues((prevFormValues: any) => ({
                                    ...prevFormValues,
                                    flat: {
                                        ...prevFormValues.flat,
                                        build_year: [+value.year()]
                                    }
                                }));
                        }}
                        picker="year"
                    />
                </StyledFormItem>
                <StyledFormItem>
                    <Label>Количество комнат</Label>
                    <InputNumber
                        min={1}
                        max={30}
                        onChange={(value) => {
                            onChangeHandler(value, 'num_room');
                        }}
                    />
                </StyledFormItem>
            </InlineContainer>
            <Form.Item>
                <Switch
                    checked={isNotMiddleFloor}
                    onChange={setIsNotMiddleFloor}
                />
                <SwitchLabel>
                    Квартира на первом или последнем этаже
                </SwitchLabel>
            </Form.Item>
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

const SwitchLabel = styled(Label)`
    margin-left: 12px;
`;

export default FlatAppraiserForm;
