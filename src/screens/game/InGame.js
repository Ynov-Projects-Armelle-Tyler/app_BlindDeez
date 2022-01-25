import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, StyleSheet, Text, Switch, Alert, BackHandler } from 'react-native';
import { useLinkTo, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native'
import Sound from 'react-native-sound'

import bg from '../../assets/NeuBG.png'
import { socket } from '../../services/socket';
import { getStorage } from '../../services/utils';
import { getApi } from '../../services/getApi';


const Background = styled.ImageBackground `
  flex: 1;
  padding: 20px;
`

const InGame = () => {
  const linkTo = useLinkTo();
  const { id } = useRoute().params;
  const [state, setState] = useState({
    party: null,
    user: null,
    userTrying: null,
    currTrack: null,
    sound: null,
  });

  const loadSong = url => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(url, Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.log('failed to load the sound', err);
          reject(err)
        }
        if (sound._loaded) {

          resolve(sound)
        }
      });
    })
  }

  const getParty = async params => {
    const user = await getStorage('user');
    const { party } = await getApi.getParty(params);

    if (party) {
      const sound = await loadSong(party.tracks[0].url)
      setState({ party, user, currentTrack: party.tracks[0], sound})
      socket.emit('party_loaded', { id });
    }
  }

  useEffect(() => {
    getParty(id)
  }, []);

  useEffect(() => {
    const onStart = async data => {
      state?.sound?.play()
    }
    const onTry = async data => {
      state?.sound?.pause()
    }
    const onFound = async data => {
      console.log(data);
      // display winner name and sleep 3s continue playlist
    }
    const onNotFound = async data => {
      console.log(data);
      // display name of tryer and sleep 3s resume song
    }
    const onEnd = async data => {
      console.log(data);
      // go to the summary of game and change the status of party in BDD
    }

    socket.on('start_party', onStart)
    socket.on('player_trying', onTry)
    socket.on('player_found', onFound)
    socket.on('player_not_found', onNotFound)
    socket.on('end_of_party', onEnd)

    return () => {
      socket.off('start_party', onStart);
      socket.off('player_trying', onTry);
      socket.off('player_found', onFound);
      socket.off('player_not_found', onNotFound);
      socket.off('end_of_party', onEnd);
    }
  }, [socket, state.sound]);

  return (
    <Background source={bg}>
      <Text>IN GAME</Text>
      <Text>{ id }</Text>
    </Background>
  );
};

const style = StyleSheet.create({
  row: {
      flex: 1,
      justifyContent: "space-around"
  },
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  }
});
export default InGame;
