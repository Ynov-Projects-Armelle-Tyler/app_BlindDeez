import React from 'react'

import styled from 'styled-components/native'
import bg from '../../assets/NeuBG.png'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text `
  color: #171717;
`

const Launch = () => {

  return (
    <Background source={bg}>
      <Title>LOL</Title>
    </Background>
  );
};

export default Launch;
