import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { Platform, ScrollView, View, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text, ActivityIndicator, Alert, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, useDispatch } from 'react-redux'
import UserInput  from '../components/UserInput'
import { signup } from '../store/actions/auth'



const {width,height} = Dimensions.get('window')
const isAndroid = Platform.OS == 'android'
const behavior = Platform.OS == 'android' ? "height" : "padding"
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
const SignIn = (props) => {

  

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [value, onChangeText] = useState(null);
  const [passCheck, setPassCheck] = useState(false)
  const dispatch = useDispatch()
  
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

//Creating a function to create account based on inputs
//it is defined as async to be able to await certain processes then go to next line of codeß
const authHandler = async () => {
    //Checking if passcheck is false
     if(passCheck === false){
       Alert.alert('Password not the same!', error, [{text: 'Okay'}])
       return;
     }
     //Creating a var and set it to be the action signup created with redux
     let action = signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.name,
        props.selectedGender,
        props.inputAge,
        props.weight,
        props.height,
    );
    //We set the state of error to null
    setError(null)
    //We set loading state to true
    setIsLoading(true)
    try{
      //We try dispatching the signup action with redux
     await dispatch(action);
     //We navigate in to the app
     props.navigation.navigate('DailyCalorie')
   } catch (err){
     //we set error to the errormessage
     setError(err.message)
     //Setting loading state to false
     setIsLoading(false)
   }
  };

  //we check if passwords is the same with useEffect, and pass inn value as the var to useEffect
  useEffect(() => {
  if (value === formState.inputValues.password) {
    setPassCheck(true)
  }
}, [value])

//Using the useCallback function to run a function only when dispatchFormState is called
//or when inputChangeHandler is called spesifically
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

  return(
   
      
        
     
       

        <View
          style={styles.buttonWrapper}>
              <Text style={styles.headerText}>Create Account</Text>
          <ScrollView >

         

          <View style={styles.cont}>
           
              <Text style={styles.inputTitle}>Name</Text>
            
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="person-outline" size={30} color="#093170"/>
              </View>
              <UserInput
                id="name"
                placeholder='Full Name'
                keyboardType="default"
                required
                autoCapitalize="none"
                errorText="please enter your name"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>
          <View style={{height: height / 40}}></View>
          <View style={styles.cont}>
            
              <Text style={styles.inputTitle}>Email</Text>
            
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="person-outline" size={30} color="#093170"/>
              </View>
              <UserInput
                id="email"
                placeholder='Your email'
                containerStyle={styles.input}
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="please enter valid email"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>

          <View style={{height: height / 40}}></View>

          <View style={styles.cont}>
            
              <Text style={styles.inputTitle}>Password</Text>
            
            <View style={styles.inputcontainer}>
              <View style={styles.iconcont}>
                <MaterialIcons name="lock-outline" size={30} color="#093170"/>
              </View>
              <UserInput
                id="password"
                placeholder='Your password'
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="please enter valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
            </View>
          </View>

          <View style={{height: height / 30}}></View>

          <View style={styles.cont}>
            
              <Text style={styles.confirmTitle}>Confirm Password</Text>
            
            <View style={styles.formControl}>
              <View style={styles.iconcont2}>
                <MaterialIcons name="lock-outline" size={30} color="#093170"/>
              </View>
              <TextInput
                placeholder='Confirm Password'
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="please enter valid password"
                onChangeText={(password) => onChangeText(password)}
                value={value}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.buttonContainerTop}>
            {isLoading ? (
              <TouchableOpacity
                onPress={authHandler}
                style={{...styles.button, backgroundColor: "#fa7f0b", flexDirection: 'row', justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="white"/>
              </TouchableOpacity>
            )
            : (
            <TouchableOpacity
              onPress={authHandler}
              style={{...styles.button, backgroundColor: "#fa7f0b", flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Sign up</Text>
              <MaterialIcons name="navigate-next" size={26} color="#fff"/>
            </TouchableOpacity>
            )}
          </View>
        
        </ScrollView>
        </View>

  )
}



const styles = StyleSheet.create({
  screen: {
    height: '100%'
  },
  arrowWrap:{
    position: 'absolute',
    top: 50,
    left: 10
    // flex:1,
  },
  cont:{
    flex:1,
    flexDirection: 'column',
  },
  inputcontainer:{
    flexDirection: 'row',
   // alignItems: 'flex-end',
  },
  formControl:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#093170",
    top: 15,
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  confirmTitle:{
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#093170",
  },
  iconcont:{
    paddingRight: 10,
    marginTop: 28
  },
  iconcont2:{
    paddingRight: 10,
  
  },
  buttonWrapper:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
   
    opacity: 1,
    paddingBottom: 35,
    paddingHorizontal: 20
  },
  button:{
    backgroundColor: 'white',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45
  },
  input:{
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerText: {
    color: 'black',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
},
})

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


