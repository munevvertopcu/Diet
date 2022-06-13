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
                    <Text>Enter your age:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(number) => {
                            props.updateInputAge(number);
                        }}
                        value={age}
                        keyboardType="numeric"
                        textAlign='center'
                       
                        
                    />
                    
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: '#762639',
        marginBottom: 15
    },
    textHeader: {
        fontSize: 25,
        color: '#762639',
    },
    textView: {
        alignItems: 'center',
        margin: 20,
        marginBottom: 25
    },
    dateView: {
        alignItems: 'center',
        marginTop: 10

    },
   
    input: {
        height: 60,
        width: 140,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#a9a9a9",
        backgroundColor: '#a9a9a9',
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
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