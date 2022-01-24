import React, { useState, useEffect } from 'react'
import { Switch, FlatList, Image } from 'react-native'
import styled from 'styled-components/native'

import { getApi } from '../../services/getApi'
import bg from '../../assets/NeuBG.png'
import Check from '../../assets/Check'
import Play from '../../assets/Play'
import Pause from '../../assets/Play'
import Add from '../../assets/Add'
import DefaultInput from '../../components/DefaultInput'

import Sound from 'react-native-sound'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text `
  color: #171717;
  width: 180px;
`

const TrackImage = styled.Image `
  width: 30px;
  height: 30px;
  border-radius: 50px;
  margin: 5px;
`

const ListItem = styled.View `
  width: 310px;
  height: 55px;
  background: #F1F1F1;
  border-radius: 8px;
  color: #171717;
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
`

const Col = styled.View `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const V = styled.View `
  height: 300px;
`

const ButtonTitle = styled.Text `
  color: white;
`

const ButtonMusic = styled.TouchableOpacity `
  background-color: #171717;
  height: 80px;
  width: 110px;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonIcon = styled.TouchableOpacity `
  border-radius: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  elevation: 3;
  margin: 5px;
`

const CreateParty = () => {
  const [player, setPlayer] = useState(false)
  const togglePlay = () => setPlayer(!player)

  const [random, setRandom] = useState(false)
  const toggleRandom = () => setRandom(!random)

  const [musicLabel, setMusicLabel] = useState([])
  const [music, setMusic] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [trackIsPlayed, setTrackIsPlayed] = useState({ url: null, track: null, played: false })
  const playlist = [{}]

  const searchTrack = async track => {
    const result = await getApi.getTrack({ track });
    if (result) setSearchResult(result.data)
  }

  const getMusicLabel = async () => {
    const label = await getApi.getPendingParties();
    if (label) {
      setMusic(label.parties)
    }
  }

  const addToPlaylist = track => {
    console.log('t: ' + track)
    playlist.push({ track })
    console.log('playlist = ' + playlist)
  }

  const play = async url => {
    if (trackIsPlayed.played){
      trackIsPlayed.track.stop()
      trackIsPlayed.track.release()
      setTrackIsPlayed({ ...trackIsPlayed, played: false })
    }

    if (trackIsPlayed.url !== url) {
      const song = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        song.play(e => console.log(e))
      });
      setTrackIsPlayed({ url: url, track: song, played: true })
    } else {
      setTrackIsPlayed({ url: null, track: null, played: false })
    }
  }

  useEffect(() => {
    getMusicLabel();
  }, []);

  const renderItem = ({ item }) => (
    <ButtonMusic onPress={() => setMusicLabel(item._id)}>
      <ButtonTitle>{item._id}</ButtonTitle>
    </ButtonMusic>
  );

  const renderSearchMusic = ({ item }) => (
    <ListItem>
      <Col>
        <TrackImage source={{ uri: item.album.cover_big }}/>
        <Title>{item.artist.name} - {item.title}</Title>
      </Col>
      <Col>
        <ButtonIcon onPress={() => addToPlaylist(item)}>
          <Check width="15px" height="15px"/>
        </ButtonIcon>
        <ButtonIcon onPress={() => play(item.preview)}>
          <Play width="15px" height="15px"/>
        </ButtonIcon>
      </Col>
    </ListItem>
  );

 const renderPlaylist = ({ item }) => (
    <ListItem>
      <Col>
        <TrackImage source={{ uri: item.album.cover_big }}/>
        <Title>{item.artist.name} - {item.title}</Title>
      </Col>
      <Col>
        <ButtonIcon onPress={() => addToPlaylist(item)}><Check width="15px" height="15px"/></ButtonIcon>
        <ButtonIcon onPress={() => play(item.preview)}><Play width="15px" height="15px"/></ButtonIcon>
      </Col>
    </ListItem>
  );

  return (
    <Background source={bg}>
      {
        musicLabel != '' ? (
          <>
            <Title>{ musicLabel }</Title>
            <Title>Random</Title>
            <Switch
              trackColor='#171717'
              thumbColor='#F1F1F1'
              onValueChange={toggleRandom}
              value={random}
            />
            <DefaultInput
              placeholder='Search a track'
              onSubmitEditing={searchTrack}
            />
            <V>
            { searchResult ? (
                <FlatList
                  style={{margin:5}}
                  numColumns={1}
                  data={searchResult}
                  keyExtractor={item => item.id}
                  renderItem={renderSearchMusic}
                />
              ) : ''
            }
            </V>
            {/* <V>
            <FlatList
                data={playlist}
                renderItem={renderPlaylist}
              />
            </V> */}
          </>
        ) : (
          <>
            <Switch
              trackColor='#171717'
              thumbColor='#F1F1F1'
              onValueChange={togglePlay}
              value={player}
            />
            <Title>Player</Title>
            <Title>Music Theme</Title>
            <FlatList
              style={{margin:5}}
              numColumns={2}
              data={music}
              keyExtractor={item => item._id }
              renderItem={renderItem}
            />
          </>
        )
      }
    </Background>
  );
};

export default CreateParty;
