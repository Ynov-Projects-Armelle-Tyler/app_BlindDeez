import * as React from 'react';

import { Stack, options, navigatorOpts } from '../services/navigation';
import Lobby from '../screens/game/Lobby';
import InGame from '../screens/game/InGame';

const Selection = () => {

  return (
    <Stack.Navigator initialRouteName="Lobby" screenOptions={navigatorOpts}>
      <Stack.Screen name="Lobby" component={Lobby} { ...options }/>
      <Stack.Screen name="InGame" component={InGame} { ...options }/>
    </Stack.Navigator>
  );
};

export default Selection;
