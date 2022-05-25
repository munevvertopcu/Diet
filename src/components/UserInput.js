import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

function UserInput({ text, onChangeText }) {
    return (
        <View style={styles.input_container}>
            <Text style={styles.inputText}>{text}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
            />
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
        borderBottomColor: "#fff",
        padding: 10,
        color: 'white',
        marginLeft: 15

    },
    inputText: {
        color: 'white',
        marginLeft: 15,
        marginBottom: 3
    },
});

export default UserInput;