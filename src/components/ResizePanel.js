import React, { useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, View, Dimensions, PanResponder, Animated, Text } from 'react-native';

export default ({ image, title, onPress }) => {

  const [state, setState] = useState({
    offset: 0,
    topHeight: 40, // min height for top pane header
    bottomHeight: 40, // min height for bottom pane header,
    deviceHeight: Dimensions.get('window').height,
    isDividerClicked: false,
    pan: new Animated.ValueXY()
  })

  const _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    // Initially, set the Y position offset when touch start
    onPanResponderGrant: (e, gestureState) => {
      setState({
        ...state,
        offset: e.nativeEvent.pageY,
        isDividerClicked: true
      })
    },

    // When we drag the divider, set the bottomHeight (component state) again.
    onPanResponderMove: (e, gestureState) => {
      console.log((state.deviceHeight - gestureState.moveY) * gestureState.moveY);

      setState({
        ...state,
        bottomHeight: gestureState.moveY > (state.deviceHeight - 40) ? 40 : state.deviceHeight - gestureState.moveY,
        offset: e.nativeEvent.pageY
      })
    },

    onPanResponderRelease: (e, gestureState) => {
      // Do something here for the touch end event
      setState({
        ...state,
        offset: e.nativeEvent.pageY,
        isDividerClicked: false
      })
    }
  });

  return (
    <View style={styles.content}>

      {/* Divider */}
      <View
        style={[{height: state.topHeight}, state.isDividerClicked ? {backgroundColor: '#666'} : {backgroundColor: '#e2e2e2'}]}
        {..._panResponder.panHandlers}
      >
        <Text>DIRVER</Text>
      </View>

      {/* Bottom View */}
      <Animated.View
        style={[{backgroundColor: 'green', minHeight: 40, maxHeight: 250}, {height: state.bottomHeight}]}
      >
        <Text>BOTTOM</Text>
      </Animated.View>
  </View>
  )
}

const styles = StyleSheet.create({
    content         : {
        flex        : 1,
        flexDirection: 'column'
    },
})
