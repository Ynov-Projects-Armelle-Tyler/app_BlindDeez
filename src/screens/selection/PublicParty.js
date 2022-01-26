import React, { useState, useEffect } from 'react';

import { useLinkTo, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'
import Add from '../../assets/Add'
import Partyies_logo from '../../assets/Partyies_logo'
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import { getApi } from '../../services/getApi';
import { getStorage } from '../../services/utils';

import { ScrollView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
`

const ButtonAdd = styled.TouchableOpacity `
  border-radius: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  elevation: 3;
`

const StyledScrollView = styled.ScrollView `
  flex-direction: 'row';
  flex-wrap: 'wrap';
`

const StyleButton = styled.TouchableOpacity `
  border-radius: 15px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 110px;
  margin: 10px;
`

const Modal = styled.Modal `
  background-color: white;
`


const PublicParty = () => {
  const linkTo = useLinkTo();
  const { style } = useRoute().params;
  const [parties, setParties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState();

  const getParties = async params => {
    const { parties } = await getApi.getPendingByMusicLabel(params);
    if (parties) {
      setParties(parties)
    }
  }

  useEffect(() => {
    getParties(style)
  }, []);

  const playerLenght = party => {
    return party.users.length
  }

  const joinParty = async data => {
    const username = await getStorage('user');

    const { party } = await getApi.joinParty(data._id, {
      player: { username },
      edit_type: 'add',
    });

    if (party) {
      linkTo(`/game/lobby/${party._id}`)
    }
  }

  const renderItem = ({ item }) => (
    <StyleButton onPress={() => joinParty(item)}>
      <Text>{item.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>{playerLenght(item)} Players</Text>
      </View>
    </StyleButton>
  );

  return (
    <Background source={bg}>
      <Text>{ style }</Text>
      { parties?.length
          ? (
            <FlatList
              style={{margin:5}}
              numColumns={2}
              columnWrapperStyle={style.row}
              data={parties}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
          )
          : (
            <Text>0 Parties</Text>
          )
      }
    </Background>
  );
};

const style = StyleSheet.create({
  row: {
      flex: 1,
      justifyContent: "space-around"
  }
});
export default PublicParty;
