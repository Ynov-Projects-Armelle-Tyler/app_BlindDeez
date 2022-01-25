import * as React from 'react';

import { Stack, options, navigatorOpts } from '../services/navigation';
import Home from '../screens/selection/Home';
import PublicParty from '../screens/selection/PublicParty';
import CreateParty from '../screens/selection/CreateParty';

const Selection = () => {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOpts}>
      <Stack.Screen name="Home" component={Home} { ...options }/>
      <Stack.Screen name="PublicParty" component={PublicParty} { ...options }/>
      <Stack.Screen name="CreateParty" component={CreateParty} { ...options }/>
    </Stack.Navigator>
  );
};

export default Selection;
