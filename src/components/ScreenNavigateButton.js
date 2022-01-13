import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

export default ({ title, href }) => {
  const linkTo = useLinkTo();

  return (
    <Button onPress={() => linkTo(href)} title={title} />
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
