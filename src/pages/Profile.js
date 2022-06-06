import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';


function Profile() {
    

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


        </View>
    )
}

export default Profile;