import * as React from 'react';

import { Stack, options, navigatorOpts } from '../services/navigation';
import Home from '../screens/auth/Home';
import Sign from '../screens/auth/Sign';

const Auth = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOpts}>
      <Stack.Screen name="Home" component={Home} { ...options }/>
      <Stack.Screen name="Sign" component={Sign} { ...options }/>
    </Stack.Navigator>
  );
};

export default Auth;
