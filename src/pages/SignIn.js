import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import CommonButton from '../components/CommonButton';
import { connect } from 'react-redux';
import UserInput from '../components/UserInput';
import SignInDto from '../SignInDto';
import { calculateTargetDate } from '../helpers';

function SignIn(props) {
    const [FirsName, setFirstName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();


    async function createSubmit () {
        let signUpDto = new SignInDto(FirsName, password, email, props.inputAge, props.selectedGender, props.goalWeight,calculateTargetDate(props.weight, props.goalWeight),  props.weight, props.height)
         const result = signUp(signUpDto)
         if(result ){
            props.navigation.navigate('DailyCalorie')
         }
        
        }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Create Account</Text>
            <View style={{ marginBottom: 30 }}>
                <UserInput text='First Name' onChangeText={setFirstName} />
                <UserInput text='Email' onChangeText={setEmail} />
                <UserInput text='Password' onChangeText={setPassword} />
            </View>
            <CommonButton title='CREATE' onPress={() => props.navigation.navigate('DailyCalorie')} />
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

function mapStateToProps(state) {
    return {
        height: state.height,
        selectedGender: state.selectedGender,
        selectedTargetWeight: state.selectedTargetWeight,
        inputAge: state.inputAge,
        weight: state.weight,
        goalWeight: state.goalWeight
        
    }
}
function mapDispatchToProps(dispatch) {
    return {
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);