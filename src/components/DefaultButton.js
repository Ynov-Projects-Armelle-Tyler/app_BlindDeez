import React from 'react'
import styled from 'styled-components/native'

const StyledView = styled.View`
  background-color: #F1F1F1;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 2px 2px;
  border-radius: 27px;
  width: 240px;
  height: 50px;
`

const StyledImage = styled.Image`
  color: palevioletred;
`

const StyledText = styled.Text`
  color: palevioletred;
`

export default ({ image, title, onPress }) => {
    return (
        <StyledView>
          { image ?. (
            <StyledImage src={image} />
          )}
            <StyledText onPress={onPress}>
              {title}
            </StyledText>
        </StyledView>
    )
}
