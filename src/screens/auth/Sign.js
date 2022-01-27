import React, { useState } from 'react'
import { Text, Switch } from 'react-native'
import styled from 'styled-components/native'
import Signup from '../../components/Signup'
import Login from '../../components/Login'
import { useRoute } from '@react-navigation/native'
import bg from '../../assets/NeuBG.png'

const Background = styled.ImageBackground `
  flex: 1;
  align-items: center;
`

const Title = styled.Text `
  font-size: 36px;
  text-align: center;
  color: #171717;
  margin: 45px;
`

const Sign = () => {
  const screen = useRoute().params.screen === 'signup'
  const [signup, setScreen] = useState(screen)
  const toggleSwitch = () => setScreen(!signup)

  return (
    <Background source={bg}>
      <Title>{signup ? 'SIGNUP' : 'LOGIN'}</Title>
      <Switch
        trackColor='#171717'
        thumbColor='#F1F1F1'
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={signup}
      />
      { signup ? (
          <Signup />
        ) : (
          <Login />
        )
      }
    </Background>
  )
}

export default Sign
