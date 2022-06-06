import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import CommonButton from '../components/CommonButton';
import { connect, useDispatch } from 'react-redux';
import UserInput from '../components/UserInput';
import { signup } from '../store/actions/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

function SignIn(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [value, onChangeText] = useState(null);
    const [passCheck, setPassCheck] = useState(false);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
            name: ''
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    });

    


    const authHandler = async () => {
        if (passCheck === false) {
            Alert.alert('Password not the same!', error, [{ text: 'Okay' }])
            return;
        }

        // await auth().createUserWithEmailAndPassword(formState.inputValues.email, formState.inputValues.password);
        let action = signup(
            formState.inputValues.email,
            formState.inputValues.password,
            formState.inputValues.name,
            props.selectedGender,
            props.inputAge,
            props.weight,
            props.height,
          );

        
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action);
            props.navigation.navigate('DailyCalorie')
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (value === formState.inputValues.password) {
            setPassCheck(true)
        }
    }, [value])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Create Account</Text>
            <View style={{ marginBottom: 30 }}>
                <UserInput
                    text='First Name'
                    id="name"
                    placeholder='Full Name'
                    keyboardType="default"
                    required
                    autoCapitalize="none"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <UserInput text='Email'
                    id="email"
                    placeholder='Your email'
                    containerStyle={styles.input}
                    keyboardType="email-address"
                    required
                    email
                    autoCapitalize="none"
                    errorText="plase enter valid email"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <UserInput text='Password'
                    id="password"
                    placeholder='Your password'
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="plase enter valid password"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
            </View>
            <View >
                <Text style={styles.confirmTitle}>Confirm Password</Text>
            </View>
            <View style={styles.formControl}>
                <View style={styles.iconcont}>
                    <MaterialIcons name="lock-outline" size={30} color="tomato" />
                </View>
                <TextInput
                    placeholder='Confirm Password'
                    keyboardType="default"
                    secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="plase enter valid password"
                    onChangeText={(password) => onChangeText(password)}
                    value={value}
                    style={styles.input}
                />
            </View>
            <View>
                {isLoading ? (
                    <TouchableOpacity
                        onPress={authHandler}
                        style={{ ...styles.button, backgroundColor: "yellow", flexDirection: 'row', justifyContent: 'center' }}>
                        <ActivityIndicator size="small" color="white" />
                    </TouchableOpacity>
                )
                    : (
                        <TouchableOpacity
                            onPress={authHandler}
                            style={{ ...styles.button, backgroundColor: "yellow", flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Sign up</Text>
                            <MaterialIcons name="navigate-next" size={26} color="black" />
                        </TouchableOpacity>
                    )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    headerText: {
        color: 'black',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    confirmTitle: {
        marginVertical: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: "tomato",
    },
    formControl: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    iconcont: {
        flexDirection: 'column',
        paddingRight: 10
    },
    button: {
        backgroundColor: 'white',
        // height: 60,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45
    },
});

function mapStateToProps(state) {
    return {
        height: state.height,
        selectedGender: state.selectedGender,
        inputAge: state.inputAge,
        weight: state.weight,

    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);