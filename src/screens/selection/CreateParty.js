import React, { useState, useEffect } from 'react'
import { Switch, FlatList, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { useLinkTo } from '@react-navigation/native';

import { getStorage } from '../../services/utils'
import { getApi } from '../../services/getApi'
import bg from '../../assets/NeuBG.png'
import Check from '../../assets/Check'
import Play from '../../assets/Play'
import Pause from '../../assets/Play'
import Add from '../../assets/Add'
import Remove from '../../assets/Remove'
import DefaultInput from '../../components/DefaultInput'
// import ResizePanel from '../../components/ResizePanel'

import Sound from 'react-native-sound'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
`

const Title = styled.Text `
  color: #171717;
  width: 180px;
`

const T = styled.Text `
  color: #171717;
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

const PlaylistView = styled.View `
  background-color: #E5E5E5;
  min-width: 95%;
  height: 150px;
  margin: -10px;
  border-radius: 30px;
`

const ButtonTitle = styled.Text `
  color: white;
`

const ButtonMusic = styled.TouchableOpacity `
  border-radius: 15px;
  background-color: ${props => props.bgColor || "palevioletred"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 110px;
  margin: 10px;
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


const colors = [
  "#EB5160",
  "#62A8AC",
  "#6153CC",
  "#EC9A29",
  "#071013",
  "#961D4E",
  "#E1F4CB",
  "#1F5CBC",
  "#EB5160",
  "#62A8AC",
  "#6153CC",
  "#EC9A29",
  "#071013",
  "#961D4E",
  "#E1F4CB",
  "#1F5CBC",
]

const CreateParty = () => {
  const linkTo = useLinkTo()
  const [user, setUser] = useState(null)
  const [player, setPlayer] = useState(false)
  const togglePlay = () => setPlayer(!player)

  const [random, setRandom] = useState(false)
  const [randomPlaylist, setRandomPlaylist] = useState([])

  const [musicLabel, setMusicLabel] = useState([])
  const [music, setMusic] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [trackIsPlayed, setTrackIsPlayed] = useState({ url: null, track: null, played: false })

  const searchTrack = async e => {
    const track = e.nativeEvent.text
    const result = await getApi.getTrack(track);
    if (result) setSearchResult(result.data)
  }

  const getMusicLabel = async () => {
    const user = await getStorage('user');
    const label = await getApi.getPendingParties();
    if (label) {
      setMusic(label.parties)
      setUser(user)
    }
  }

  const toggleRandom = async () => {
    setRandom(!random)

    if(!random && randomPlaylist.length < 1) {
      let randomNumber = 15 - playlist.length
      const randomTracks = await getApi.getRandomTracks({musicLabel, randomNumber})
      if (randomTracks) {
        randomTracks.random.tracks.forEach(async track => {
          const result = await getApi.getTrackFromId(track.id)
          if (result) {
            playlist.push(result)
            randomPlaylist.push(result)
          }
        })
      }
    } else if (random && randomPlaylist.length > 0) {
      randomPlaylist.forEach(track => {
        playlist.filter(e => e !== track)
      })
      setRandomPlaylist([])
    }
  }

  const addToPlaylist = track => {
    setPlaylist([...playlist, track])
  }

  const removeToPlaylist = track => {
    setPlaylist(playlist.filter(e => e !== track))
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

  const _createParty = async () => {
    const playlistToSend = playlist?.map(e => ({
      title: e.title_short,
      url: e.preview,
      band: e.artist.name,
      cover: e.album.cover,
    }))

    const party = {
      tracks: playlistToSend,
      master_user: { username: user, player },
      music_label: musicLabel
    }

    const result = await getApi.createParty({ party });
    if (result) {
      if (player) {
        const join = await getApi.joinParty(result.room, {
          player: { username: user },
          edit_type: 'add',
        });
      }

      linkTo(`/game/lobby/${result.room}`)
    }
  }

  const renderItem = ({ item, index }) => (
    <ButtonMusic onPress={() => setMusicLabel(item._id)} bgColor={colors[index]}>
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
        <ButtonIcon onPress={() => removeToPlaylist(item)}>
          <Remove width="15px" height="15px"/>
        </ButtonIcon>
        <ButtonIcon onPress={() => play(item.preview)}>
          <Play width="15px" height="15px"/>
        </ButtonIcon>
      </Col>
    </ListItem>
  );

  return (
    <Background source={bg}>
      {
        musicLabel != '' ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <T>{ musicLabel }</T>
              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <T>Random</T>
                <Switch
                  trackColor='#171717'
                  thumbColor='#F1F1F1'
                  onValueChange={toggleRandom}
                  value={random}
                />
              </View>
              <View>
                <ButtonIcon onPress={_createParty}>
                  <Play width="15px" height="15px"/>
                </ButtonIcon>
              </View>
            </View>
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
            <PlaylistView>
              <FlatList
                style={{margin:5}}
                numColumns={1}
                data={playlist}
                keyExtractor={item => item.id}
                renderItem={renderPlaylist}
              />
            </PlaylistView>
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
              renderItem={(item, index) => renderItem(item, index)}
            />
          </>
        )
      }
    </Background>
  );
};

export default CreateParty;
