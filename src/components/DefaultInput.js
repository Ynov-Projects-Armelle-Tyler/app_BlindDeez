import React from 'react'
import styled from 'styled-components/native'

const StyledInput = styled.TextInput`
  font-size: 18px;
  color: #171717;
  background-color: #F1F1F1;
  width: 300px;
  height: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 3;
  border-radius: 26px;
  padding: 0 20px;
`

export default ({ onBlur, onChangeText, onSubmitEditing, value, placeholder, ...rest }) => {
    return (
      <StyledInput
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        {...rest}
      />
    )
}
