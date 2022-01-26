import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, BackHandler } from 'react-native';
import { useLinkTo, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native'

import bg from '../../assets/NeuBG.png'
import userImg from '../../assets/default-user-img.png'
import { socket } from '../../services/socket';
import { getStorage, sleep } from '../../services/utils';
import { getApi } from '../../services/getApi'

const Background = styled.ImageBackground `
  flex: 1;
  padding: 20px;
`

const Image = styled.Image `
  width: 42px;
  height: 40px;
  margin-right: 10px;
  border-radius: 90px;
`

const Summary = () => {
  const linkTo = useLinkTo()
  const { id } = useRoute().params
  const [bar, setBar] = useState({ interval: null, progress: 0 });
  const [state, setState] = useState({
    party: null,
  })

  const getParty = async params => {
    const user = await getStorage('user')
    const { party } = await getApi.getParty(params)

    if (party) {
      setState({ party })
    }
  }

  useEffect(() => {
    getParty(id)
  }, [])

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to leave summary ?", [
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

  const renderItem = ({ item }) => (
    <View style={style.viewCenter}>
      <Image source={userImg} />
      <Text>{item.username}</Text>
    </View>
  );

  return (
    <Background source={bg}>
      <View style={style.container}>
        <Text>End Of Party</Text>
        <FlatList
          style={{margin:5}}
          numColumns={1}
          data={state?.party?.users}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </View>
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
  viewCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  }
  });
export default Summary;
