import React, {useState} from 'react'
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import firestore from '@react-native-firebase/firestore'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import Card from '../Components/Card'
import Button from '../Components/Button'
import store from '../../Redux/store'
import {GETPLAYERINFO} from '../../Redux/actions'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [data, setdata] = useState([])
  const getUsers = async () => {
    const users = await firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        let dat = []
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.data().id = documentSnapshot.id
          dat.push(documentSnapshot.data())
        })

        setdata(dat)
      })
  }

  useFocusEffect(
    React.useCallback(() => {
      getUsers()
    }, [data]),
  )

  return (
    <ScrollView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <View style={{height: hp('5%')}}></View>
        <Text style={styles.mainHeading}>LEADERBOARD</Text>
        <View style={{height: hp('3%')}}></View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => <Card item={item} index={index} />}
            />
          </ScrollView>
        </ScrollView>
        <View style={{height: hp('3%')}}></View>
        <Button
          title='Add Player'
          onPress={() => {
            store.dispatch(GETPLAYERINFO(''))
            navigation.navigate('AddPlayer')
          }}
        />
      </View>
      <View style={{height: hp('8%')}}></View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9c9ad6',
  },
  boxStyle: {
    width: wp('50%'),
    height: hp('20%'),
    borderWidth: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainHeading: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
})
export default HomeScreen
