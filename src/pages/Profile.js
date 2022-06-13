import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { logout } from '../store/actions/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')


function Profile(props) {
  const [displayName, setDisplayName] = React.useState(null)
  const dispatch = useDispatch()



  const token = useSelector(state => state.token)
  const age = useSelector(state => state.inputAge)
  const weight = useSelector(state => state.weight)
  const userheight = useSelector(state => state.height)
  const gender = useSelector(state => state.selectedGender)


  React.useEffect(() => {
    const getDisplayName = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const transformedData = JSON.parse(userData);
      const { token, userId, displayName } = transformedData;
      const displayArray = displayName.split(' ')
      let firstChar;
      let secondChar;
      let displayNameShort;
      if (displayArray.length < 2) {
        firstChar = displayArray[0].slice(0, 1)
        displayNameShort = firstChar.toUpperCase()
      } else {
        firstChar = displayArray[0].slice(0, 1)
        secondChar = displayArray[1].slice(0, 1)
        displayNameShort = firstChar.toUpperCase() + secondChar.toUpperCase()
      }
      setDisplayName(displayNameShort)
    };
    getDisplayName()
  }, [dispatch])

  const deleteHandler = async () => {
    const user = await auth().currentUser
    
    database().ref('users').child(user.uid).set(null)
    database().ref('userMeals').child(user.uid).set(null)
    dispatch(logout())
    await user.delete()
    props.navigation.navigate('Home')
  }



  return (
    <View style={{flex: 1, justifyContent:'space-between'}}>
      <View>
      <View style={{ height: height / 3.5, backgroundColor: '#fa9a56', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 100, height: 100, backgroundColor: '#f9b686', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 36, fontWeight: 'bold', color: '#ff6800'}}>{displayName}</Text>
        </View>
      </View>
      <View style={{marginLeft: 120 , marginTop: 70}}>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 25, marginRight: 45}}>Age:</Text>
        <Text style={{fontSize:25, color: 'black'}}>{age}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 25, marginRight: 15}}>Height:</Text>
        <Text style={{fontSize:25, color: 'black'}}>{userheight} cm</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 25, marginRight: 15}}>Weight:</Text>
        <Text style={{fontSize:25, color: 'black'}}>{weight} kg</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25, marginRight: 15}}>Gender:</Text>
          {gender == 1 ? <Text style={{fontSize:25, color: 'black'}}>Male</Text > : <Text style={{fontSize:25, color: 'black'}}>Female</Text>}
        </View>
      </View>
</View>
      


<View style={{alignItems: 'center', marginBottom: 30}}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Are you sure you want to log out?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Yes',
                onPress: () => {
                  //If so..
                  //Dispatch to redux to call logout function
                  dispatch(logout())
                  //Navigating to startscreen
                  props.navigation.navigate('Home')
                }
              },
            ],
            { cancelable: true }
          );

        }}
        style={{ ...styles.Button, backgroundColor: "#f7812e" }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
          Log Out
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
          'Are you sure you want to delete your account?',
          'All data about you will be deleted',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Yes',
              onPress: () => deleteHandler()
            },
          ],
          { cancelable: true }
          );
        }}
        style={{...styles.Button, backgroundColor: '#f7812e'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: "#fff"}}>
          Delete Account
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#fff"/>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTop: {
    height: height / 3
  },
  preferences: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 200,
  },
  modal: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: height / 1.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  modalButton: {
    paddingVertical: 15,
    borderWidth: 1.5,
    width: '90%',
    borderColor: "#da2626",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10
  },
  modalButton2: {
    paddingVertical: 15,
    borderWidth: 1.5,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#e56767",
    marginHorizontal: 5
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "tomato",
    padding: 16,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 30,
    marginBottom:10
  },
  settingsText: {
    fontSize: 36,
    color: "tomato",
    fontWeight: 'bold',
  },
  boxWrap: {
    width: '80%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap: {
    marginRight: 60
  },
  boxText: {
    fontSize: 24,
    fontWeight: '500',
  },
  button2: {
    backgroundColor: "tomato",
    // paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: width / 2.2,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 8
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default Profile;