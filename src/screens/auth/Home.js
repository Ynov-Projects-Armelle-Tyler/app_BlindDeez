import React from 'react';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'
import { setStorage, genNum } from '../../services/utils'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Home = () => {

  const onGuest = async () => {
    await setStorage('user', `guest-${genNum()}`);
  };

  return (
    <Background source={bg}>
      <ScreenNavigateButton title="Sign Up" href="/auth/sign/signup"/>
      <ScreenNavigateButton title="Login" href="/auth/sign/login"/>
      <ScreenNavigateButton title="Guest" href="/selection/home/" onPress={onGuest}/>
    </Background>
  );
};

export default Home;
