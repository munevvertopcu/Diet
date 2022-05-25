import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CommonButton from '../components/CommonButton';
import UserInput from '../components/UserInput';

function LogIn() {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    return (
        <View style={styles.container}>
                <Text style={styles.headerText}>Log In</Text>
            <View style={{ marginBottom: 30 }}>
                <UserInput text='Email' onChangeText={setEmail}/>
                <UserInput text='Password' onChangeText={setPassword}/>
            </View>
            <CommonButton title='LOG IN' onPress={null} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    headerText: {
        color: 'white',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center'
    }
});



export default LogIn;