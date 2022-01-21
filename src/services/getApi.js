import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  auth
} from './config';
import * as Token from './token';

const getHeaders = async () => {
  const token = await Token.getToken();
  let headers;

  if (token) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Access-Token': token
    };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  return headers;
};

const login = async data => {
  const headers = await getHeaders();

  const req = await fetch(
    auth + '/login',
    {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data.data),
    }
  );

  if (req.ok) {
    const res = req.json();
    await res.then(value => {
      Token.setToken(value.accessToken);
    });

    return req.ok;
  } else {
    const res = req.json();
    await res.then(value => {
      Token.setMessage(value.message);
    });
    console.log('HTTP-Error: ' + req.status);

    return false;
  }
};

const signup = async data => {
  const headers = await getHeaders();
  const req = await fetch(
    auth,
    {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data),
    }
  );

  if (req.ok) {
    const res = req.json();
    res.then(value => {
      Token.setMessage(value.message);
    });

    return req.ok;
  } else {
    const res = req.json();
    res.then(value => {
      Token.setMessage(value.message);
    });
    console.log('HTTP-Error: ' + req.status);

    return false;
  }
};


export const getApi = {
  login,
  signup,
};
