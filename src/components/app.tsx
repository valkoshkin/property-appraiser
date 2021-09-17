import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
// @ts-ignore
import { ReactComponent as CentInvestLogo } from '../assets/cent-invest-logo.svg';
// @ts-ignore
import subHeaderImage from '../assets/subheader-image.png';
import PropertyAppraiserForm from './property-appraiser-form';
import {
    PropertyAppraiserFormMode,
    PropertyAppraiserFormModeType
} from '../model/types';

const App = () => {
    const [mode, setMode] = useState<PropertyAppraiserFormModeType>(
        PropertyAppraiserFormMode.CAR
    );

    const onChangeChandler = useCallback((event) => {
        setMode(event.target.value);
    }, []);

    return (
        <Container>
            <Header>
                <StyledLogo />
            </Header>
            <SubHeader>
                <InfoPanel>
                    <InfoPanelTitle>сколько стоит ... ?</InfoPanelTitle>
                    <InfoPanelText>
                        Выберите тип и укажите параметры имущества, а система
                        определит его рыночную стоимость с помощью машинного
                        обучения и анализа более 300 000 тысяч объявлений о
                        продаже авто и 10 000 объявлений о продаже квартир.
                    </InfoPanelText>
                    <Radio.Group
                        size="large"
                        defaultValue="car"
                        onChange={onChangeChandler}
                    >
                        <Radio.Button value="car">Автомобиль</Radio.Button>
                        <Radio.Button value="flat">Квартира</Radio.Button>
                    </Radio.Group>
                </InfoPanel>
                <ImageWrapper>
                    <img src={subHeaderImage} alt="Расчет стоимости" />
                </ImageWrapper>
            </SubHeader>
            <FormWrapper>
                <PropertyAppraiserForm mode={mode} />
            </FormWrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fcfcfc;
`;

const FormWrapper = styled.div`
    padding: 24px 0;
    width: 60%;
`;

const Header = styled.div`
    width: 100%;
    background-color: rgba(80, 184, 72, 0.07);
    padding-left: 84px;
`;

const SubHeader = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 32px 48px;
    display: flex;
    justify-content: space-between;
`;

const InfoPanel = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    padding: 0 48px;
`;

const InfoPanelTitle = styled.span`
    font-size: 36px;
    font-weight: bold;
    padding-bottom: 16px;
`;

const InfoPanelText = styled.div`
    padding-bottom: 24px;
    font-size: 18px;
`;

const ImageWrapper = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;
    > img {
        width: 45%;
        height: auto;
    }
`;

const StyledLogo = styled(CentInvestLogo)`
    width: 96px;
    height: 96px;
    transform: scale(1.5);
`;

export default App;
