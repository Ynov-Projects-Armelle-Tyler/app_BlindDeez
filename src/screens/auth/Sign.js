import React, { useState } from 'react'
import { Text, Switch } from 'react-native'
import Signup from '../../components/Signup';
import Login from '../../components/Login';
import { useRoute } from '@react-navigation/native';

const Sign = () => {
  const screen = useRoute().params.screen === 'signup'
  const [signup, setScreen] = useState(screen);
  const toggleSwitch = () => setScreen(!signup);

  return (
    <>
      <Text>{signup ? 'Signup' : 'Login'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={signup ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={signup}
      />
      { signup ? (
          <Signup />
        ) : (
          <Login />
        )
      }
    </>
  );
};

export default Sign;
