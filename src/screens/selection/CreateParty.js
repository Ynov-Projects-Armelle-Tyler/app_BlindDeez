import React, { useState } from 'react'
import { Switch, FlatList, Image } from 'react-native'
import styled from 'styled-components/native'

import { getApi } from '../../services/getApi'
import bg from '../../assets/NeuBG.png'
import DefaultInput from '../../components/DefaultInput'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text `
  color: #171717;
`

const TrackImage = styled.Image `
  width: 30px;
  height: 30px;
  border-radius: 50px;
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

const datas = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

const CreateParty = () => {
  const [player, setPlayer] = useState(false)
  const togglePlay = () => setPlayer(!player)

  const [random, setRandom] = useState(false)
  const toggleRandom = () => setRandom(!random)

  const [musicLabel, setMusicLabel] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const searchTrack = async track => {
    const result = await getApi.getTrack({ track });
    if (result) setSearchResult(result.data)
  }

  const renderItem = ({ item }) => (
    <ButtonMusic onPress={() => setMusicLabel(item.title)}>
      <ButtonTitle>{item.title}</ButtonTitle>
    </ButtonMusic>
  );

  const renderSearchMusic = ({ item }) => (
    <ListItem>
      <TrackImage source={{
          uri: item.album.cover_big
      }} />
      <Title>{item.artist.name} - {item.title}</Title>
      <Title></Title>
    </ListItem>
  );

  console.log(searchResult)
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
            { searchResult ? (
                <FlatList
                  style={{margin:5}}
                  numColumns={1}
                  data={searchResult}
                  keyExtractor={item => item.id }
                  renderItem={renderSearchMusic}
                />
            ) : ''
            }
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
              data={datas}
              keyExtractor={item => item.id }
              renderItem={renderItem}
            />
          </>
        )
      }
    </Background>
  );
};

export default CreateParty;
