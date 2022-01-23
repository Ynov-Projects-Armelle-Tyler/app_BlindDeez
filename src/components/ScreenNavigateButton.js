import React from 'react';
import { useLinkTo } from '@react-navigation/native';
import DefaultButton from './DefaultButton.js';

export default ({ title, href, onPress }) => {
  const linkTo = useLinkTo();

  const _onPress = async () => {
    await onPress?.();
    linkTo(href);
  };

  return (
    <DefaultButton onPress={_onPress} title={title} />
  );
};
