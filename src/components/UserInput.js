import React, { useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        //If input changes the state will be set to previous state, but value will change to the action value
        //IsValid will also change to the action isValid value
        case INPUT_CHANGE:
            //Return a javascript object (which redux by default require)
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};


function UserInput(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        //Do some regular checking of the Text
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        //is passing the tests, we dispatch an action INPUT_CHANGE, with values and isvalid state
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    return (
        <View style={styles.input_container}>
            <Text style={styles.inputText}>{props.text}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    input_container: {
        margin: 5
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        padding: 10,
        color: 'black',
        marginLeft: 15

    },
    inputText: {
        color: 'black',
        marginLeft: 15,
        marginBottom: 3
    },
    errorContainer: {
        marginVertical: 5
      },
      errorText: {
        color: 'red',
        fontSize: 13
      }
});

export default UserInput;