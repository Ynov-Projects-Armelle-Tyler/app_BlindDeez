import React from 'react'
import styled from 'styled-components/native'

const StyledView = styled.TouchableOpacity `
  background-color: #F1F1F1;
  width: 200px;
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  elevation: 3;
  border-radius: 26px;
`

const StyledImage = styled.Image`
  color: palevioletred;
`

const StyledText = styled.Text`
  font-size: 18px;
  color: #171717;
`

export default ({ image, title, onPress }) => {
    return (
        <StyledView onPress={onPress}>
          { image ?. (
            <StyledImage src={image} />
          )}
            <StyledText>
              {title}
            </StyledText>
        </StyledView>
    )
}
