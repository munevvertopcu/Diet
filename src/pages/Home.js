import React from "react";
import { SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import CommonButton from '../components/CommonButton';
import auth from '@react-native-firebase/auth';


const image = { uri: "http://www.londonesthetic.com/wp-content/uploads/2018/03/slider-2-1.jpg" };



function Home(props) {
    const [visible, setVisible] = React.useState(false);
    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };

    const login = () => {
        setVisible(!visible);
        props.navigation.navigate('LogIn');
    }

    const signup = () => {
        auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!',)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image_background}
                imageStyle={{ opacity: 0.3 }}>
                <View style={styles.headerView}>
                    <Text style={styles.header}>DietApp</Text>
                </View>
                <View>
                    <Text style={styles.text}>Your partner in health and nutrition</Text>
                    <CommonButton title='GET STARTED' onPress={() => props.navigation.navigate('StartPlan')} />
                    <TouchableOpacity style={styles.logInButton} onPress={toggleBottomNavigationView}>
                        <Text style={styles.loginButtonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logInButton} onPress={signup}>
                        <Text style={styles.loginButtonText}>sign up</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}>
                    <View style={styles.bottomNavigationView}>
                        <Text style={{ color: 'white', fontSize: 20, margin: 15 }}>Log In</Text>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={login}>
                            <Text style={{ color: '#fffafa' }}>
                                CONTINUE WITH EMAIL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
        backgroundColor: "#00000060",
        justifyContent: 'space-between',
    },
    header: {
        color: '#00fa9a',
        fontWeight: 'bold',
        fontSize: 40,
        fontStyle: 'italic'
    },
    headerView: {
        alignItems: 'center',
        marginTop: 40
    },
    text: {
        color: '#fffafa',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 45
    },
    logInButton: {
        alignItems: 'center',
        padding: 15,
        marginBottom: 20,
        marginHorizontal: 15
    },
    loginButtonText: {
        color: '#fffafa',
        fontWeight: 'bold',
        fontSize: 16
    },
    item: {
        alignItems: "center",
        backgroundColor: "#00fa9a",
        padding: 20,
        margin: 15,
        borderRadius: 30,
    },
    bottomNavigationView: {
        backgroundColor: 'black',
        width: '100%',
        height: 200,
        alignItems: 'center',
    },
}
)


export default Home;

