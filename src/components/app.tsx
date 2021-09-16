import React, { useCallback, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, Menu } from 'antd';
import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import PropertyAppraiserForm from './property-appraiser-form';
import { PropertyAppraiserFormMode } from '../model/types';

const App = () => {
    const [mode, setMode] = useState<PropertyAppraiserFormMode>('car');

    // example of request
    const sendRequest = useCallback(
        async () =>
            axios.get(
                'http://cors-anywhere.herokuapp.com/http://mrmarknike.pythonanywhere.com/api/car/brands'
            ),
        []
    );

    const onMenuClick = useCallback((event) => {
        setMode(event.key);
    }, []);

    return (
        <Container>
            <StyledMenu
                onClick={onMenuClick}
                selectedKeys={[mode]}
                mode="horizontal"
            >
                <Menu.Item key="car" icon={<CarOutlined />}>
                    Автомобиль
                </Menu.Item>
                <Menu.Item key="flat" icon={<HomeOutlined />}>
                    Квартира
                </Menu.Item>
            </StyledMenu>
            <StyledCard>
                <PropertyAppraiserForm mode={mode} />
            </StyledCard>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledMenu = styled(Menu)`
    padding-top: 50px;
`;

const StyledCard = styled(Card)`
    width: 80%;
`;

export default App;
