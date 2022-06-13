import React, { useState, useReducer, useCallback, useEffect, useRef } from 'react'
import { Platform, ScrollView, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, ActivityIndicator, Alert, Dimensions } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserInput from '../components/UserInput'



const behavior = Platform.OS == 'android' ? "height" : "padding"


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const { width, height } = Dimensions.get('window')

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

const LogIn = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const imageRef = useRef(null);

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    let action = login(
      formState.inputValues.email,
      formState.inputValues.password
    );

    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action);

      props.navigation.navigate("Sayfa")
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  };


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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error, [{ text: 'Okay' }])
    }
  }, [error])

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={-200}
      style={styles.screen}>

      <View
        style={styles.buttonWrapper}>
        <Text style={styles.headerText}>Create Account</Text>
        <ScrollView style={styles.form}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.inputcontainer}>
            <View style={styles.iconcont}>
              <MaterialIcons name="person-outline" size={30} color="#093170" />
            </View>
            <UserInput
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
          </View>

          <View style={{ height: height / 25 }}></View>

          <View style={styles.cont}>
            <View style={styles.titlecont}>
              <Text style={styles.inputTitle}>Password</Text>
            </View>
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="lock-outline" size={30} color="#093170" />
              </View>
              <UserInput
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
          </View>
          <View style={styles.buttonContainerTop}>
            {isLoading ? (
              <TouchableOpacity
                onPress={authHandler}
                style={{ ...styles.button, backgroundColor: "#fa7f0b", flexDirection: 'row', justifyContent: 'center' }}>
                <ActivityIndicator size="small" color="black" />
              </TouchableOpacity>
            )
              : (
                <TouchableOpacity
                  onPress={authHandler}
                  style={{ ...styles.button, backgroundColor: "#fa7f0b", flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Log in</Text>
                  <MaterialIcons name="navigate-next" size={26} color="#fff" />
                </TouchableOpacity>
              )}
          </View>
          <View style={{ height: height / 50 }}></View>




        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  arrowWrap: {
    top: height / 20,
    flex: 1,
  },
  header: {
    marginBottom: height / 13,
    paddingHorizontal: 15,
  },
  headerText: {
    color: 'black',
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  cont: {
    flex: 1,
    flexDirection: 'column',
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093170',
    top: 15
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 1,
    paddingVertical: 35,
    paddingHorizontal: 20
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 18,
    textAlign: 'left',
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
    color: "black"
  },

})

export default LogIn
