import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Header({ text1, text2 }) {
    return (
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.text}>{text1}</Text>
            </View>
            <View style={styles.inner_container}>
                <Text style={styles.text}>{text2}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inner_container: {
        backgroundColor: '#141414',
        width: 130,
        alignItems: 'center',
        padding: 7,
        borderRadius: 20

    },
    text: {
        color: '#fffafa',
        fontSize: 18
    }
})

export default Header;