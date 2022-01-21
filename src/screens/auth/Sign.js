import React from 'react'
import { Text, Switch } from 'react-native'
import Login from '../../components/Login';
import Signup from '../../components/Signup';
import { useRoute } from '@react-navigation/native';

const Sign = ({  }) => {
  const screen = useRoute().params.screen

  return (
    <>
      <Text>{screen}</Text>
      { screen === 'signup' ? (
          <Signup />
        ) : (
          <Login />
        )
      }
    </>
  );
};

export default Sign;
