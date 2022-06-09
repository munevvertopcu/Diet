import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { logout } from '../store/actions/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width,height} = Dimensions.get('window')


function Profile(props) {
    
    const dispatch = useDispatch()
// const authHandler = async () => {
//     const user = auth().currentUser;
// const idToken = await  user.getIdToken();
//     if (user) {

//         console.log('User email: ', user.email);
//         console.log('User token: ', idToken);
   
//        }
// }

React.useEffect(() => {
    database()
    .ref('foods/')
    .on('value', snapshot => {
        const contentData = snapshot.val();
     console.log(contentData);
    });
}, [])

const token = useSelector(state => state.token)
    
const fetchIngredients = async () => {
    const response = await fetch(`https://dietnutrition-ea78c-default-rtdb.firebaseio.com/foods.json`);
    const resData = await response.json();
    console.log(resData)
  }
    
    
    
    

   
    return (
        <View>
            {/* <Text>{user.email}</Text>
            <Text>{user.uid}</Text> */}
            <Text>jkkj</Text>

            <Button title="update" onPress={fetchIngredients}/>

            <TouchableOpacity
        onPress={() => {
          // Asking user if they are sure to log out
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
        style={{...styles.preferencesButton, backgroundColor: "tomato"}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          Log Out
        </Text>
        <MaterialIcons name="navigate-next" size={26} color="#000"/>
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    flex:1,
  },
  backgroundTop:{
    height: height / 3
  },
  preferences:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 200,
  },
  modal:{
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
  modalButton:{
    paddingVertical: 15,
    borderWidth: 1.5,
    width: '90%',
    borderColor: "#da2626",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10
  },
  modalButton2:{
    paddingVertical: 15,
    borderWidth: 1.5,
    borderRadius: 30,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#e56767",
    marginHorizontal: 5
  },
  preferencesButton:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "tomato",
      padding: 16,
      width: '80%',
      flexDirection: 'row',
      borderRadius: 30
  },
  settingsText:{
    fontSize: 36,
    color: "tomato",
    fontWeight: 'bold',
  },
  boxWrap:{
    width: '80%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap:{
    marginRight: 60
  },
  boxText:{
    fontSize: 24,
    fontWeight: '500',
  },
  button2:{
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
  buttonText2:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  })

export default Profile;