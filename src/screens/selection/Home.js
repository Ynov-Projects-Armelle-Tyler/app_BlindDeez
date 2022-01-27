import React, { useState, useEffect } from 'react';

import { useLinkTo } from '@react-navigation/native';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'
import Add from '../../assets/Add'
import Parties_logo from '../../assets/Parties_logo'
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
  background-color: ${props => props.bgColor || "palevioletred"};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 110px;
  margin: 10px;
`

const ButtonTitle = styled.Text `
  color: white;
`

const Modal = styled.Modal `
  background-color: white;
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

const Home = () => {
  const linkTo = useLinkTo();
  const [parties, setParties] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState();

  const getParties = async () => {
    const parties = await getApi.getPendingParties();
    if (parties) {
      setParties(parties.parties)
    }
  }

  useEffect(() => {
    getParties();
  }, []);

  const onChange = e => {
    setCode(e);
  }

  const joinParty = async () => {
    const username = await getStorage('user');

    const { party } = await getApi.joinParty('code', {
      player: { username },
      edit_type: 'add',
      code
    });

    if (party) {
      linkTo(`/game/lobby/${party._id}`)
      setModalVisible(false)
      setCode('')
    }
  }

  const renderItem = ({ item, index }) => (
    <StyleButton onPress={() => linkTo(`/selection/public/${item._id}`)} bgColor={colors[index]}>
      <ButtonTitle>{item._id}</ButtonTitle>
      <View style={{ flexDirection: 'row' }}>
        <Parties_logo />
        <ButtonTitle>{item.count}</ButtonTitle>
      </View>
    </StyleButton>
  );

  return (
    <Background source={bg}>
      <DefaultButton
        onPress={() => setModalVisible(true)}
        title="Join with a code"
      />
        <FlatList
          style={{margin:5}}
          numColumns={2}
          columnWrapperStyle={style.row}
          data={parties}
          keyExtractor={item => item._id}
          renderItem={(item, index) => renderItem(item, index)}
        />
        <ButtonAdd onPress={() => linkTo('/selection/create')}>
          <Add/>
        </ButtonAdd>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View>
            <DefaultInput
              onSubmitEditing={joinParty}
              onChangeText={onChange}
              value={code}
              placeholder='CODE'
            />
          </View>
        </Modal>
    </Background>
  );
};

const style = StyleSheet.create({
  row: {
      flex: 1,
      justifyContent: "space-around"
  }
});
export default Home;
