import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import firestore from '@react-native-firebase/firestore'
import SimpleInput from '../Components/Input'
import {ScrollView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import store from '../../Redux/store'
import DateTimePicker from '@react-native-community/datetimepicker';
const AddPlayer = () => {
  const navigation = useNavigation()
  const [playerName, setplayerName] = useState('')
  const [location, setlocation] = useState('')
  const [type, settype] = useState('')
  const [dateShow, setdateShow] = useState('')
  const [points, setpoints] = useState('')
  const [units, setunits] = useState('')

  const [errors, setErrors] = useState({
    PlayerNameError: '',
    LocationError: '',
    TypeError: '',
    UnitsError: '',
    PointsError: '',
    DateShowError: '',
  })

  const isValid = () => {
    let playerNameError = ''
    let locationError = ''
    let typeError = ''
    let unitsError = ''
    let dateShowError = ''
    let pointsError = ''

    if (!playerName) playerNameError = 'Player Name is required'
    if (!location) locationError = 'Location is required'
    if (!type) typeError = 'Type is required'
    if (!dateShow) dateShowError = 'Date  is required'
    if (!points) pointsError = 'Points is required'
    if (!units) unitsError = 'Units is required'

    if (
      playerNameError ||
      locationError ||
      unitsError ||
      dateShowError ||
      typeError ||
      pointsError
    ) {
      setErrors({
        PlayerNameError: playerNameError,
        LocationError: locationError,
        TypeError: typeError,
        UnitsError: unitsError,
        PointsError: pointsError,
        DateShowError: dateShowError,
      })
      return false
    }

    setErrors({
      PlayerNameError: '',
      LocationError: '',
      TypeError: '',
      UnitsError: '',
      PointsError: '',
      DateError: '',
    })
    return true
  }

  const PlayerInfo = {
    name: playerName,
    Location: location,
    Type: type,
    Units: units,
    Quantity: points,
    Date: dateShow,
  }
  const Validate = () => {
    if (isValid()) {
      console.log(PlayerInfo)
      firestore()
        .collection('users')
        .add(PlayerInfo)
        .then(() => {
          alert('User added Successfully')
          navigation.navigate('Home')
        })
        .catch(err => alert(err))
    }
  }
  useEffect(() => {
    if (store.getState().playerInfo) {
      setdateShow(store.getState().playerInfo.Date)
      setpoints(store.getState().playerInfo.Quantity)
      setunits(store.getState().playerInfo.Units)
      setlocation(store.getState().playerInfo.Location)
      setplayerName(store.getState().playerInfo.name)
      settype(store.getState().playerInfo.Type)
    }
  }, [])
  const SubmitMethod = () => {
    if (store.getState().playerInfo) {
      firestore()
        .collection('users')
        .doc(store.getState().playerInfo.id)
        .update(PlayerInfo)
        .then(() => {
          alert('User Updated Successfully')
          navigation.navigate('Home')
        })
    } else {
      Validate()
    }
  }
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let temtravelDate = new Date(currentDate)

    let fdate =
      (temtravelDate.getMonth() + 1) +
      ' / ' +
      temtravelDate.getDate()  +
      ' / ' +
      temtravelDate.getFullYear()
      setdateShow(fdate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <View style={{height: hp('8%')}}></View>
        <Text style={styles.mainHeading}>Add Player</Text>
        <View style={{height: hp('4%')}}></View>
        <View style={{width: wp('80%'), alignSelf: 'center'}}>
          <SimpleInput
            placeholder={'Participant Name'}
            value={playerName}
            onChangeText={e => setplayerName(e)}
            placeholderTextColor='#fff'
            error={errors.PlayerNameError}
          />
          <View style={{height: hp('3%')}}></View>
          <SimpleInput
            placeholder={'Location'}
            value={location}
            onChangeText={e => setlocation(e)}
            placeholderTextColor='#fff'
            error={errors.LocationError}
          />
          <View style={{height: hp('3%')}}></View>
         
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.textInputStyles}>{dateShow?dateShow:'Select Date'}</Text>
          </TouchableOpacity>
          <View style={{height: hp('3%')}}></View>
          <SimpleInput
            placeholder={'Units'}
            keyboardType='number-pad'
            value={units}
            onChangeText={e => setunits(e)}
            placeholderTextColor='#fff'
            error={errors.UnitsError}
          />
          <View style={{height: hp('3%')}}></View>
          <SimpleInput
            placeholder={'Type'}
            value={type}
            onChangeText={e => settype(e)}
            placeholderTextColor='#fff'
            error={errors.TypeError}
          />
          <View style={{height: hp('3%')}}></View>
          <SimpleInput
            placeholder={'Points'}
            keyboardType='number-pad'
            value={points}
            onChangeText={e => setpoints(e)}
            placeholderTextColor='#fff'
            error={errors.PointsError}
          />
          <View style={{height: hp('8%')}}></View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#605d9e',
            alignItems: 'center',
            justifyContent: 'center',
            padding: hp('2%'),
            borderRadius: hp('2%'),
            paddingHorizontal: hp('2%'),
          }}
          onPress={() => SubmitMethod()}>
          <Text
            style={{
              fontSize: hp('2%'),
              fontWeight: 'bold',
              color: '#ffff',
            }}>
            Add Player
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: hp('8%')}}></View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9c9ad6',
  },
  mainHeading: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  }, textInputStyles: {
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
export default AddPlayer
