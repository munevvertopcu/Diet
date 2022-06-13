import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

function CommonButton({title, onPress}) {
    return(
        <View >
            <TouchableOpacity style={styles.button}
            onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#fa7f0b",
        padding: 20,
        margin: 15,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fffafa',
        fontWeight: 'bold',
        fontSize: 17
    },
})

export default CommonButton;