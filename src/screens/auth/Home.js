import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';

import ScreenNavigateButton from '../../components/ScreenNavigateButton';

const Home = () => {

  return (
    <>
      <Text>HOME</Text>
      <ScreenNavigateButton title="Sign Up" href="/auth/sign/" />
      <ScreenNavigateButton title="Login" href="/auth/sign/" />
      <ScreenNavigateButton title="Guest" href="/selection/home/" />
    </>
  );
};

const styles = StyleSheet.create({
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
