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
  const { id } = useRoute().params;
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
  }, []);

  const renderItem = ({ item }) => (
    <StyleButton onPress={() => console.log('click')}>
      <Text>{item.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>{(item.users.length + 1)} Players</Text>
      </View>
    </StyleButton>
  );

  return (
    <Background source={bg}>
      <Text>LOBBY</Text>
      <Text>{ id }</Text>
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
