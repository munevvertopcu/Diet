import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CommonButton from '../components/CommonButton';
import { BottomSheet } from 'react-native-btr';
import moment from "moment";
import { calculateTargetDate } from '../helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function Progress(props) {
    const [visible, setVisible] = React.useState(false);
    const [targetDate, setTargetDate] = React.useState(null);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        let today = moment(new Date()).format("MMM Do YY")
        setDate(today)
    }, []);

    React.useEffect(() => {
        setTargetDate(calculateTargetDate(props.weight, props.goalWeight));
    }, []);

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };

    const signIn = () => {
        setVisible(!visible);
        props.navigation.navigate('SignIn');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your projected progress</Text>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#faa14c', width: 80, height: 45, alignItems: 'center', justifyContent: 'center', padding: 7, borderRadius: 10, marginHorizontal: 30 }}>
                        <Text style={styles.weightText}>{props.weight} kg</Text>
                    </View>
                    <FontAwesome name="long-arrow-right" size={50} color="#fa7f0b" />
                    <View style={{ backgroundColor: '#faa14c', width: 80, height: 45, alignItems: 'center', justifyContent: 'center', padding: 7, borderRadius: 10, marginHorizontal: 30 }}>
                        <Text style={styles.weightText}>{props.goalWeight} kg</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 50 }}>
                    <Text style={styles.dateText}>Today</Text>
                    <Text style={styles.dateText2}>{targetDate}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                <Text style={{color:'#762639', fontSize: 25}}>0,50 kg/week</Text>
                <Text style={{color:'#762639', fontSize: 15}}>Recommended</Text>
            </View>
            </View>
            



            <CommonButton title='NEXT' onPress={toggleBottomNavigationView} />

            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bottomNavigationView}>
                    <Text style={{ color: 'white', fontSize: 20, margin: 15 }}>
                        Create an account</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={signIn}>
                        <Text style={styles.buttonText}>CONTINUE WITH EMAIL</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    header: {
        color: '#762639',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 35,
        
    },
    weightText: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold'
    },
    bottomNavigationView: {
        backgroundColor: 'black',
        width: '100%',
        height: 200,
        alignItems: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#00fa9a",
        padding: 20,
        margin: 15,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
    },
    dateText: {
        color: '#fa7f0b',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 83,
        marginRight: 115
    },
    dateText2: {
        color: '#fa7f0b',
        fontSize: 18,
        fontWeight: 'bold',


    }
})


function mapStateToProps(state) {
    return {
        goalWeight: state.goalWeight,
        weight: state.weight,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress);