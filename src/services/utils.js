import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (name, value) =>
  await AsyncStorage.setItem(`@${name}`, value);

export const getStorage = async name =>
  await AsyncStorage.getItem(`@${name}`);

export const exists = v => !isNull(v) && !isUndefined(v);

export const isUndefined = v => typeof v === 'undefined';

export const isNull = v => v === null;

export const get = (obj = {}, path = '', defaultValue = null) => path
  .split('.')
  .reduce((a, c) =>
    exists(a) && exists(a[c])
      ? a[c]
      : defaultValue
  , obj);
