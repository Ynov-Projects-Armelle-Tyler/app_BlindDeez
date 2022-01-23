import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, options, linking, navigatorOpts } from './services/navigation';

import Auth from './routers/Auth';
import Selection from './routers/Selection';
import Game from './routers/Game';

const App = () => {
  return (
      <NavigationContainer linking={linking} screenOptions={navigatorOpts}>
        <Stack.Navigator initialRouteName="Auth" >
          <Stack.Screen name="Auth" component={Auth} { ...options }/>
          <Stack.Screen name="Selection" component={Selection} { ...options }/>
          <Stack.Screen name="Game" component={Game} { ...options }/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
