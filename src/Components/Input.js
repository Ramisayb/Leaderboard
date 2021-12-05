import React from 'react'
import {StyleSheet, TextInput, Text} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
const SimpleInput = props => {
    
  return (
    <>
      <TextInput
        style={
          props.error
            ? [styles.textInputStyles, {borderBottomColor: 'red'}]
            : styles.textInputStyles
        }
        {...props}
      />
      {props.error ? (
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: hp('1.6%'),
            color: 'red',
            marginTop: hp('1%'),
          }}>
          {' '}
          {`* ${props.error}`}
        </Text>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  textInputStyles: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: hp('1%'),
    paddingHorizontal: '2%',
    width: '100%',
    fontFamily: 'Montserrat-Regular',
    fontSize: hp('2.2%'),
    color: '#fff',
  },
})
export default SimpleInput
