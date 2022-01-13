import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';

import ScreenNavigateButton from '../../components/ScreenNavigateButton';

const Home = () => {

  return (
    <>
      <Text>SELECTION</Text>
      <ScreenNavigateButton title="Launch a Party" href="/selection/launch/" />
      <ScreenNavigateButton title="Join a Party" href="/selection/join/" />
      <ScreenNavigateButton title="Bands" href="/selection/bands/" />
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
