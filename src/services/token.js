import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const setToken = async (token) => {
  //console.log(token)
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    return null;
  }
};

export const setMessage = async (message) => {
  console.log(message)
  try {
    await AsyncStorage.setItem('message', message);
  } catch (e) {
    return null;
  }
};

export const getUserId = async () => {
  const token = await getToken();
  let userId;

  if(token){
    const payload = jwt_decode(token);
    userId = payload.id;
  }

  return userId;
}