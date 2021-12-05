import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import firestore from '@react-native-firebase/firestore'
import {Icon} from 'react-native-elements'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import store from '../../Redux/store'
import {GETPLAYERINFO} from '../../Redux/actions'

const Card = props => {
  const navigation = useNavigation()
  const [color, setcolor] = useState(
    'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')',
  )
  const {item, index} = props
  const DeleteUser = id => {
    firestore()
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        alert('User deleted!')
      })
      .catch(err => alert(err))
  }
  const [count, setcount] = useState(Number(item.Quantity))

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        store.dispatch(GETPLAYERINFO(item))
        if (store.getState().playerInfo) {
          navigation.navigate('AddPlayer')
        }
      }}>
      <View style={{height: hp('3%')}}></View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={[
            styles.numberTextStyle,
            {
              backgroundColor: color,
            },
          ]}>
          <Text style={{color: '#fff', fontSize: hp('3.5%')}}>{index + 1}</Text>
        </View>
        <View style={{marginHorizontal: wp('3%'), width: wp('50%')}}>
          <Text style={styles.nameStyle}>{item.name} </Text>
          <Text style={styles.textsStyle}> {item.Location} </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={styles.textsStyle}> {item.Date} </Text>
            <Text style={styles.textsStyle}>
              {item.Units} Km
              {'  '}
            </Text>
          </View>
          <View style={{height: hp('1%')}}></View>
          <Text style={[styles.textsStyle, {fontWeight: 'bold'}]}>
            {' '}
            {item.Type}{' '}
          </Text>
        </View>
        <Icon
          name='delete'
          color={'red'}
          size={hp('4%')}
          containerStyle={{alignSelf: 'flex-start', marginTop: hp('2%')}}
          onPress={() => DeleteUser(item.id)}
        />
      </View>
      <View style={styles.counterStyle}>
        <Icon
          name='minus'
          type='antdesign'
          color={'red'}
          size={hp('3%')}
          onPress={() => setcount(count + 1)}
        />
        <Text style={{fontSize: hp('3%'), color: 'black'}}>{count}</Text>
        <Icon
          name='plus'
          type='antdesign'
          color={'red'}
          size={hp('3%')}
          onPress={() => setcount(count + 1)}
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  card: {
    width: wp('90%'),
    height: hp('20%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: hp('1%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    justifyContent: 'space-evenly',
  },
  numberTextStyle: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  nameStyle: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  textsStyle: {
    color: 'black',
    fontSize: hp('2.2%'),
  },
  counterStyle: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginBottom: hp('3%'),
  },
})
export default Card
