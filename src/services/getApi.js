import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  auth,
  user,
  party,
  deezerSearch
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
    user,
    {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(data.data),
    }
  )

  if (req.ok) {
    const res = req.json();
    await res.then(value => {
      Token.setMessage(value.message);
    });

    return req.ok;
  } else {
    const res = req.json();
    res.then(value => {
      Token.setMessage(value.message);
    });
    console.log('HTTP-Error: ' + res);

    return false;
  }
};

const getParty = async id => {
  const headers = await getHeaders();
  const req = await fetch(
    `${party}/${id}`,
    {
      method: 'GET',
      mode: 'cors',
      headers
    }
  );

  console.log( await req.ok)

  if (req.ok) {
    const parties = await req.json()

    return parties;
  } else {
    const res = req.json();
    console.log('HTTP-Error: ' + res);

    return false;
  }
};

const getPendingParties = async () => {
  const headers = await getHeaders();
  const req = await fetch(
    party + '/pending',
    {
      method: 'GET',
      mode: 'cors',
      headers
    }
  );

  console.log( await req.ok)

  if (req.ok) {
    const parties = await req.json()

    return parties;
  } else {
    const res = req.json();
    console.log('HTTP-Error: ' + res);

    return false;
  }
};

const getPendingByMusicLabel = async style => {
  const headers = await getHeaders();

  console.log(style);
  const req = await fetch(
    `${party}/pending/${style}`,
    {
      method: 'GET',
      mode: 'cors',
      headers
    }
  );

  console.log( await req.ok)

  if (req.ok) {
    const parties = await req.json()

    return parties;
  } else {
    const res = req.json();
    console.log('HTTP-Error: ' + res);

    return false;
  }
};

const joinWithCode = async (id, data) => {
  const headers = await getHeaders();

  const req = await fetch(
    `${party}/code/player`,
    {
      method: 'PATCH',
      mode: 'cors',
      body: JSON.stringify(data),
      headers
    }
  );

  if (req.ok) {
    const party = await req.json()

    return party;
  } else {
    const res = req.json();
    console.log('HTTP-Error: ' + res);

    return false;
  }
};

const getTrack = async track => {

  const headers = await getHeaders();
  const req = await fetch(
      deezerSearch + track,
    {
      method: 'GET',
      mode: 'cors',
      headers,
    }
  );
  console.log(req)

  if (req.ok) {
    const res = req.json();

    return res;
  } else {
    const res = req.json();
    console.log('HTTP-Error: ' + res);

    return false;
  }
};


export const getApi = {
  login,
  signup,
  getPendingParties,
  getPendingByMusicLabel,
  joinWithCode,
  getParty,
  getTrack,
};
