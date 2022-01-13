import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, options, linking, navigatorOpts } from './services/navigation';

import Auth from './routers/Auth';
import Selection from './routers/Selection';

const App = () => {

  return (
      <NavigationContainer linking={linking} screenOptions={navigatorOpts}>
        <Stack.Navigator initialRouteName="Auth" >
          <Stack.Screen name="Auth" component={Auth} { ...options }/>
          <Stack.Screen name="Selection" component={Selection} { ...options }/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
