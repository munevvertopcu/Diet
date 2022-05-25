import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Header from "../components/Header";
import CommonButton from "../components/CommonButton";


function StartPlan(props) {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Header text1='Happier' text2='Healthier' />
                <View style={styles.imageView}>
                    <ImageBackground source={require('../../assets/apple.png')} style={styles.image} />
                </View>
                <Header text1='Balanced' text2='Energized' />

            </View>
            <View>
                    <Text style={styles.header_text}>Welcome to DietApp!</Text>
                    <Text style={styles.text}>Let us know your goal, and we'll get you a personalized health plan in minutes.</Text>
                <CommonButton title='GET YOUR PLAN' onPress={() => props.navigation.navigate('ChooseOptions')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'space-between',
    },
    innerContainer: {
        marginTop: 70
    },
    imageView: {
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: '#fffafa',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 40
    },
    header_text: {
        fontSize: 22,
        color: '#fffafa',
        marginBottom: 15,
        textAlign: 'center'
    },
}
);

export default StartPlan;