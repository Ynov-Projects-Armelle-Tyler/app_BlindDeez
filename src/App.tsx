import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Stack, linking } from './services/navigation';

import Home from './screens/Home';

const App = () => {

  return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
