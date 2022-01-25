import * as React from 'react';

import { Stack, options, navigatorOpts } from '../services/navigation';
import Lobby from '../screens/game/Lobby';

const Selection = () => {

  return (
    <Stack.Navigator initialRouteName="Lobby" screenOptions={navigatorOpts}>
      <Stack.Screen name="Lobby" component={Lobby} { ...options }/>
    </Stack.Navigator>
  );
};

export default Selection;
