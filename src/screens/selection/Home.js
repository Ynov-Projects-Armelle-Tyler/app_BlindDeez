import React from 'react';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Home = () => {

  return (
    <Background source={bg}>
      <ScreenNavigateButton title="Launch a party" href="/selection/launch/"/>
      <ScreenNavigateButton title="Join a Party" href="/selection/join/" />
    </Background>
  );
};

export default Home;
