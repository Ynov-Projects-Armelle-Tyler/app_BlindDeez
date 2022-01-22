import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Stack = createStackNavigator();
export const Draw = createDrawerNavigator();
export const Tab = createBottomTabNavigator();

export const navigatiorOpts = {
  cardStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  transparentCard: true,
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  }),
};

export const options = {
  options: {
    headerTransparent: true,
    headerTitle: false,
    headerShown: false,
  },
};

export const linking = {
  prefixes: ['https://blinddeez.com', 'blinddeez://'],
  config: {
    screens: {
      Auth: {
        path: 'auth/',
        screens: {
          Home: 'home/',
          Sign: 'sign/:screen',
        },
      },
      Selection: {
        path: 'selection/',
        screens: {
          Home: 'home/',
          CreateParty: 'create/',
        },
      },
    },
  },
};
