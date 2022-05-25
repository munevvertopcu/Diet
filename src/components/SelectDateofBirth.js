import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';


function SelectDateofBirth(props) {
    const [age, setAge] = React.useState(props.inputAge);

    React.useEffect(() => {
        setAge(props.inputAge);
    })
    
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.textView}>
                    <Text style={styles.text}>Got it.</Text>
                    <Text style={styles.textHeader}>How old are you?</Text>
                </View>
                <View style={styles.dateView}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(number) => {
                            props.updateInputAge(number);
                        }}
                        value={age}
                        placeholder="useless placeholder"
                        keyboardType="numeric"
                    />
                    <Text>Age: {age}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: 'black',
        marginBottom: 15
    },
    textHeader: {
        fontSize: 25,
        color: 'black',
    },
    textView: {
        alignItems: 'center',
        margin: 20,
        marginBottom: 25
    },
    dateView: {
        alignItems: 'center',
        marginTop: 35

    },
   
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },

})

function mapStateToProps(state) {
    return {
        inputAge: state.inputAge,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateInputAge: (param) => dispatch({
            type: 'UPDATE-INPUT-AGE', payload: {
                inputAge: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDateofBirth);