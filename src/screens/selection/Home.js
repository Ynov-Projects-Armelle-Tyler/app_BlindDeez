import React, { useState, useEffect } from 'react';

import { useLinkTo } from '@react-navigation/native';
import styled from 'styled-components/native'
import ScreenNavigateButton from '../../components/ScreenNavigateButton';
import bg from '../../assets/NeuBG.png'
import Add from '../../assets/Add'
import DefaultButton from '../../components/DefaultButton';
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


const Home = () => {
  const linkTo = useLinkTo();
  // const [parties, setParties] = useState(null);

  // const getParties = async () => {
  //   const parties = await getApi.getMoviesFromApiAsync();
  //   console.log('ok: ' + parties)
  //   if (parties) {
  //     setParties(parties)
  //   }
  // }

  // useEffect(() => {
  //   getParties();
  // }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.count}</Text>
    </View>
  );

  return (
    <Background source={bg}>
      <DefaultButton
        title="Join with a code"
      />
        {/* <FlatList
          data={datas}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          numColumns={datas.length / 2}
        /> */}
        {/* <FlatList
          style={{margin:5}}
          numColumns={2}                  // set number of columns
          columnWrapperStyle={style.row}  // space them out evenly

          data={parties}
          keyExtractor={item => item.id }
          renderItem={renderItem}
        /> */}
        <ButtonAdd onPress={() => linkTo('/selection/create')}>
          <Add/>
        </ButtonAdd>
      {/* <ScreenNavigateButton title="Launch a party" href="/selection/launch/"/>
      <ScreenNavigateButton title="Join a Party" href="/selection/join/" /> */}
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
