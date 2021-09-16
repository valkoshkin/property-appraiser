import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <Container>
        Тест
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #282c34;
    color: white;
`;

export default App;
