import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, StyleSheet, Text, Switch, Alert, BackHandler } from 'react-native';
import { useLinkTo, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native'
import Sound from 'react-native-sound'
import { Bar } from 'react-native-progress';

import DefaultInput from '../../components/DefaultInput'
import bg from '../../assets/NeuBG.png'
import questionMark from '../../assets/question_mark.png'
import { socket } from '../../services/socket';
import { getStorage, sleep, matchAnswer } from '../../services/utils';
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
  border-radius: 100px;

  ${({ found }) => found ? `
    width: 190px;
    height: 190px;
  ` : `
    width: 150px;
    height: 150px;
  `}
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
  const [bar, setBar] = useState({ interval: null, progress: 0 });
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
    found: false,
  })

  // const animate = (t) => {
  //   let p = bar?.progress
  //   const interval = setInterval(() => {
  //     console.log('trying', t);
  //     if (!t) {
  //       p += 0.033333333
  //       console.log(p);
  //       setBar({ ...bar, progress: p });
  //       if (p > 1) {
  //         console.log('too much');
  //         clearInterval(interval)
  //         setBar({ ...bar, progress: 0  });
  //       }
  //     }
  //   }, 1000);
  // }

  const loadSong = url => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(url, Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.error('failed to load the sound', err)
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
      setState({ ...state, party, user, sound, playlistSize: party.tracks?.length, currentTrack: 0})
      socket.emit('party_loaded', { id })
    }
  }

  const trying = () => {
    if (!state.trying && !state?.userTrying) {
      setState({ ...state, trying: true })
      socket.emit('player_trying', { id, user: state?.user })
    }
  }

  const validAnswer = async () => {
    const found = matchAnswer(state?.party?.tracks[state?.currentTrack], state?.answer)

    if (found) {
      const index = state?.currentTrack + 1;
      if (state?.playlistSize === index) {
        socket.emit('end_of_party', { id, user: state?.user })
      } else {
        console.log('found');
        setState({ ...state, openModal: false, answer: null })
        await socket.emit('player_found', { id, user: state?.user })
      }
    } else {
      onCloseModal()
      console.log('NOT found');
    }
  }

  const onCloseModal = () => {
    setState({ ...state, openModal: false, trying: false, answer: null })
    socket.emit('player_not_found', { id, user: state?.user })
  }

  const trackFinished = async success => {
    if (success) {
      const index = state?.currentTrack + 1;
      if (state?.playlistSize === index) {
        socket.emit('end_of_party', { id, user: state?.user })
      } else {
        state?.sound?.stop()
        state?.sound?.release()
        const sound = await loadSong(state?.party?.tracks[index].url)
        setState({ ...state, sound, currentTrack: index, openModal: false })
        socket.emit('next_track', { id, user: state?.user })
      }
    }
  }

  useEffect(() => {
    getParty(id)
  }, []);

  // For SOCKET.IO
  useEffect(() => {
    const onStart = async data => {
      await sleep(3000)
      console.log('duration', state?.sound?.getDuration());
      state?.sound?.play(trackFinished)
      // animate(state?.trying)
    }
    const onTry = async data => {
      state?.sound?.pause()

      if (data.user === state?.user) {
        setState({ ...state, openModal: true, found: false })
      } else {
        setState({ ...state, userTrying: data.user, trying: false, found: false })
      }
    }
    const onFound = async data => {
      state?.sound?.stop()
      state?.sound?.release()

      const index = state?.currentTrack + 1;
      const sound = await loadSong(state?.party?.tracks[index].url)
      setState({ ...state, sound, currentTrack: index, openModal: false, found: true })
      setBar({ progress: 2 })
    }
    const onNotFound = async data => {
      await sleep(3000)
      state?.sound?.play(trackFinished)
      setState({ ...state, userTrying: null, canShake: true })
      // animate()
    }
    const onEnd = async data => {
      state?.sound?.stop()
      state?.sound?.release()
      // clearInterval(bar?.interval)
      // setBar({ interval: null, progress: 0 });
      console.log('Party finish');
      linkTo(`/game/summary/${id}`);
    }
    const onNextTrack = async data => {
      await sleep(3000)
      setState({ ...state, found: false })
      state?.sound?.play(trackFinished)
      // clearInterval(bar?.interval)
      // setBar({ interval: null, progress: 0 });
      // animate(state?.trying)
      console.log('play next track');
    }

    socket.on('start_party', onStart)
    socket.on('player_trying', onTry)
    socket.on('player_found', onFound)
    socket.on('player_not_found', onNotFound)
    socket.on('end_of_party', onEnd)
    socket.on('next_track', onNextTrack)

    return () => {
      socket.off('start_party', onStart);
      socket.off('player_trying', onTry);
      socket.off('player_found', onFound);
      socket.off('player_not_found', onNotFound);
      socket.off('end_of_party', onEnd);
      socket.off('next_track', onNextTrack)
    }
  }, [socket, state.sound]);

  // For ACCELEROMETER
  // useEffect(() => {
  //   const sub = accelerometer.subscribe(({ x, y, z }) => {
  //     const speed = x + y + z;
  //
  //     if (speed > 10) {
  //       console.log('SHAKED');
  //       trying()
  //       sub.unsubscribe()
  //     }
  //   });
  //
  //   return () => {
  //     sub.unsubscribe();
  //   }
  // }, [state.trying]);

  return (
    <Background source={bg}>
      <View style={style.container}>
        <View>
          <Text>{ state?.userTrying ? `${state?.userTrying} Trying` : '' }</Text>
        </View>
        <ImageButton onPress={trying}>
          <Image
            source={state?.found
              ? { uri: state?.party?.tracks[state?.currentTrack].cover }
              : questionMark}
          />
        </ImageButton>
        <View style={{ marginTop: 20 }}>
          <Bar
            width={200}
            progress={bar?.progress}
          />
        </View>
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
            value={state?.answer}
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
