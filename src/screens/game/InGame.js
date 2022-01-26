import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, StyleSheet, Text, Switch, Alert, BackHandler } from 'react-native';
import { useLinkTo, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native'
import Sound from 'react-native-sound'

import DefaultInput from '../../components/DefaultInput'
import bg from '../../assets/NeuBG.png'
import questionMark from '../../assets/question_mark.png'
import { socket } from '../../services/socket';
import { getStorage } from '../../services/utils';
import { getApi } from '../../services/getApi'
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

const Background = styled.ImageBackground `
  flex: 1;
  padding: 20px;
`

const Image = styled.Image `
  width: 150px;
  height: 150px;
  border-radius: 100px;
`

const ImageButton = styled.TouchableOpacity `
  width: 200px;
  height: 200px;
  background-color: #6153CC;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`

const Modal = styled.Modal `
  background-color: white;
`

const InGame = () => {
  const linkTo = useLinkTo()
  const { id } = useRoute().params
  const [state, setState] = useState({
    party: null,
    user: null,
    userTrying: null,
    openModal: false,
    currTrack: null,
    sound: null,
    trying: false,
    answer: null,
    canShake: true,
  })

  const loadSong = url => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(url, Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.log('failed to load the sound', err)
          reject(err)
        }
        if (sound._loaded) {

          resolve(sound)
        }
      });
    })
  }

  const getParty = async params => {
    const user = await getStorage('user')
    const { party } = await getApi.getParty(params)

    if (party) {
      const sound = await loadSong(party.tracks[0].url)
      setState({ ...state, party, user, currentTrack: party.tracks[0], sound})
      socket.emit('party_loaded', { id })
    }
  }

  const trying = () => {
    if (!state.trying && !state?.userTrying) {
      setState({ ...state, trying: true })
      socket.emit('player_trying', { id, user: state?.user })
    }
  }

  const validAnswer = () => {
    setState({ ...state, openModal: false })
  }

  const onCloseModal = () => {
    setState({ ...state, openModal: false, trying: false })
    socket.emit('player_not_found', { id, user: state?.user })
    console.log(state);
  }

  useEffect(() => {
    getParty(id)
  }, []);

  // For SOCKET.IO
  useEffect(() => {
    const onStart = async data => {
      state?.sound?.play()
    }
    const onTry = async data => {
      state?.sound?.pause()

      if (data.user === state?.user) {
        setState({ ...state, openModal: true })
      } else {
        setState({ ...state, userTrying: data.user, trying: false })
      }
    }
    const onFound = async data => {
      console.log(data);
      // display winner name and sleep 3s continue playlist
    }
    const onNotFound = async data => {
      // display name of tryer and sleep 3s resume song

      state?.sound?.play()
      setState({ ...state, canShake: true })
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

  // For ACCELEROMETER
  useEffect(() => {
    const sub = accelerometer.subscribe(({ x, y, z }) => {
      const speed = x + y + z;

      if (speed > 10) {
        console.log('SHAKED');
        trying()
        sub.unsubscribe()
      }
    });

    return () => {
      sub.unsubscribe();
    }
  }, [state.trying]);

  return (
    <Background source={bg}>
      <View style={style.container}>
        <ImageButton onPress={trying}>
          <Image source={questionMark}/>
        </ImageButton>
      </View>

      <Modal
        animationType="slide"
        visible={state.openModal}
        onRequestClose={onCloseModal}
      >
        <View>
          <DefaultInput
            onSubmitEditing={validAnswer}
            onChangeText={(value) => setState({ ...state, answer: value })}
            value={state.answer}
            placeholder='Answer'
          />
        </View>
      </Modal>
    </Background>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InGame;
