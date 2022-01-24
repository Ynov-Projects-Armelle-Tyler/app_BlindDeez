import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, StyleSheet, Text, Switch, Alert, BackHandler } from 'react-native';

import { useLinkTo, useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'
import Add from '../../assets/Add'
import userImg from '../../assets/default-user-img.png'
import { getApi } from '../../services/getApi';
import { socket } from '../../services/socket';


const Background = styled.ImageBackground `
  flex: 1;
  padding: 20px;
`

const StyleView = styled.View `
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

const Image = styled.Image `
  width: 42px;
  height: 40px;
  margin-right: 10px;
  border-radius: 90px;
`


const PublicParty = () => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const { id } = useRoute().params;
  const [party, setParty] = useState({});
  const [isPublic, setPublic] = useState(false);

  const getParty = async params => {
    const res = await getApi.getParty(params);
    if (res) {
      setParty(res.party)
      setPublic(res.party.public)
    }
  }

  useEffect(() => {
    getParty(id)
  }, []);

  useEffect(() => {
    const callback = async data => {
      await getParty(id)
    }

    socket.on('user_join_room', callback)
    socket.on('user_leave_room', callback)

    return () => {
      socket.off('user_join_room', callback);
      socket.off('user_leave_room', callback);
    }
  }, [socket]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to leave party ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => {
            socket.emit('user_leave_room');
            linkTo('/selection/home/');
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const toggleSwitch = () => {
    setPublic(!isPublic);
    // WARNING: PATCH party with api
  }

  const playerLenght = () => {
    const master = party?.master_user?.player ? 1 : 0

    return party?.users?.length + master
  }


  const renderItem = ({ item }) => (
    <View style={style.viewCenter}>
      <Image source={userImg} />
      <Text>{item.username}</Text>
    </View>
  );

  return (
    <Background source={bg}>
      <View style={style.viewCenter}>
        <StyleView>
          <Text>{ party?.music_label }</Text>
        </StyleView>
        <Text>{ party?.name }</Text>
      </View>
      <View style={style.viewCenter}>
        <Switch
          trackColor='#171717'
          thumbColor='#F1F1F1'
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPublic}
        />
        <Text>{ isPublic ? 'Public' : 'Private' }</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text>Players { `(${playerLenght()}/15) :` }</Text>
        <FlatList
          style={{margin:5}}
          numColumns={1}
          data={party?.users}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
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
export default PublicParty;
