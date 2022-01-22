import React, { useState } from 'react'
import { Switch, FlatList } from 'react-native'
import styled from 'styled-components/native'
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

  const [music, setMusic] = useState('')

  const renderItem = ({ item }) => (
    <ButtonMusic onPress={() => setMusic(item.title)}>
      <ButtonTitle>{item.title}</ButtonTitle>
    </ButtonMusic>
  );

  console.log(music)
  return (
    <Background source={bg}>
      {
        music != '' ? (
          <>
            <Title>{ music }</Title>
            <Title>Random</Title>
            <Switch
              trackColor='#171717'
              thumbColor='#F1F1F1'
              onValueChange={toggleRandom}
              value={random}
            />
            <DefaultInput placeholder='Search a track'/>
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
