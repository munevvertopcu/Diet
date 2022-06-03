import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
    

const authHandler = async () => {
    const user = auth().currentUser;
const idToken = await  user.getIdToken();
    if (user) {

        console.log('User email: ', user.email);
        console.log('User token: ', idToken);
   
       }
}

    

    function updateCals() {

dispatch({type: 'UPDATE_CALORIE_SUG'});
    }

    
    const calorySuggestio = useSelector(state => state.dailyCals);
    const dispatch = useDispatch();
    

   
    return (
        <View>
            {/* <Text>{user.email}</Text>
            <Text>{user.uid}</Text> */}
            <Text>{calorySuggestio}</Text>

            <Button title="update" onPress={authHandler}/>


        </View>
    )
}

export default Profile;