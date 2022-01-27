import React, { useState, useEffect } from 'react';
import { ScrollView, View, FlatList, StyleSheet, Text, Switch, Alert, BackHandler } from 'react-native';

import { useLinkTo, useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native'
import DefaultButton from '../../components/DefaultButton';
import bg from '../../assets/NeuBG.png'
import Add from '../../assets/Add'
import userImg from '../../assets/default-user-img.png'
import { getApi } from '../../services/getApi';
import { socket } from '../../services/socket';
import { getStorage } from '../../services/utils';


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

const StyledInput = styled.TextInput`
  color: #171717;
  background-color: #F1F1F1;
  width: 150px;
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 3;
  border-radius: 26px;
  padding: 0 20px;
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

const PlayButtonView = styled.View `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 20px;
  right: 6%;
  elevation: 3;
`


const PublicParty = () => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const { id } = useRoute().params;
  const [party, setParty] = useState({});
  const [isPublic, setPublic] = useState(false);
  const [isMaster, setMaster] = useState(false);
  const [code, setCode] = useState(false);
  const [name, setName] = useState({ isEditing: false, value: null });

  const getParty = async params => {
    const user = await getStorage('user');
    const res = await getApi.getParty(params);

    if (res) {
      setParty(res.party)
      setPublic(res.party.public)
      setMaster(!(res.party?.master_user?.username === user));
      setCode(res.party?.code || undefined)
      setName({ ...name, value: res.party?.name })
    }
  }

  useEffect(() => {
    getParty(id)
  }, [isPublic]);

  useEffect(() => {
    const callback = async data => {
      await getParty(id)
    }
    const lauch = () => {
      linkTo(`/game/playing/${id}`)
    }

    socket.on('user_join_room', callback)
    socket.on('user_leave_room', callback)
    socket.on('edit_party_visibility', callback)

    socket.on('master_launch_game', lauch)

    return () => {
      socket.off('user_join_room', callback);
      socket.off('user_leave_room', callback);
      socket.off('edit_party_visibility', callback);
      socket.off('master_launch_game', lauch);
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

  const toggleSwitch = async e => {
    const res = await getApi.editPublic(id, e);

    if (res) {
      setPublic(e);
    }
  }

  const editName = async e => {
    const res = await getApi.editName(id, name.value);

    if (true) {
      setName({ ...name, isEditing: false })
    }
  }

  const playGame = async e => {
    const res = await getApi.playGame(id, 'in_game');

    if (res) {
      socket.emit('master_launch_game', { id });
    }
  }

  const playerLenght = () => {
    return party?.users?.length
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
        { name.isEditing ?
          <StyledInput
            value={name.value}
            onChangeText={(value) => setName({ ...name, value })}
            autoFocus
            onBlur={editName}
          /> :
          <Text
            onPress={() => {
              if (!isMaster) {
                setName({ ...name, isEditing: true })
              }
            }}
          >
            {name.value}
          </Text>
        }
      </View>
      <View style={style.viewCenter}>
        <Switch
          trackColor='#171717'
          thumbColor='#F1F1F1'
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPublic}
          disabled={isMaster}
        />
        <Text>{ isPublic ? 'Public' : 'Private' }</Text>
        <Text style={{ marginLeft: 10 }}>{ party?.code }</Text>
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
      <PlayButtonView>
          <DefaultButton
            title="Play"
            disabled={isMaster}
            onPress={playGame}
          />
      </PlayButtonView>
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
