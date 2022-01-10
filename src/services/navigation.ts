import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Stack = createStackNavigator();
export const Draw = createDrawerNavigator();
export const Tab = createBottomTabNavigator();

export const linking = {
  prefixes: ['https://blinddeez.com', 'blinddeez://'],
  config: {
    screens: {
      Home: 'home/',
    },
  },
};
