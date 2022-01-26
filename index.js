import { AppRegistry, LogBox } from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']);

import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
