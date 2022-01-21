import React from 'react';
import { useLinkTo } from '@react-navigation/native';
import DefaultButton from './DefaultButton.js';

export default ({ title, href }) => {
  const linkTo = useLinkTo();

  return (
    <DefaultButton onPress={() => linkTo(href)} title={title} />
  );
};
