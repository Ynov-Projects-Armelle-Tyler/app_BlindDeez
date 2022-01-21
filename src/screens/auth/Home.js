import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
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
      <Text>HOME</Text>
      <ScreenNavigateButton title="Sign Up" href="/auth/sign/signup"/>
      <ScreenNavigateButton title="Login" href="/auth/sign/login"/>
      <ScreenNavigateButton title="Guest" href="/selection/home/" />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
