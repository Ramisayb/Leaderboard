import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btnStyle}>
      <Text
        style={{
          fontSize: hp('2%'),
          fontWeight: 'bold',
          color: '#ffff',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#605d9e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('2%'),
    borderRadius: hp('2%'),
    paddingHorizontal: hp('2%'),
  },
})
export default Button
