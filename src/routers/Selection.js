import * as React from 'react';

import { Stack, options, navigatorOpts } from '../services/navigation';
import Home from '../screens/selection/Home';

const Selection = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOpts}>
      <Stack.Screen name="Home" component={Home} { ...options }/>
    </Stack.Navigator>
  );
};

export default Selection;
