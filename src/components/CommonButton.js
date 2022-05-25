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
        backgroundColor: "#00fa9a",
        padding: 20,
        margin: 15,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fffafa',
        fontWeight: 'bold',
        fontSize: 16
    },
})

export default CommonButton;