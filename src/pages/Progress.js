import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CommonButton from '../components/CommonButton';
import { BottomSheet } from 'react-native-btr';
import moment from "moment";
import { calculateTargetDate } from '../helpers';


function Progress(props) {
    const [visible, setVisible] = React.useState(false);
    const [targetDate, setTargetDate] = React.useState(null);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        let today = moment(new Date()).format("YYYY-MM-DD")
        setDate(today)
      }, []);

      React.useEffect(() => {
        setTargetDate(calculateTargetDate(props.weight , props.goalWeight));
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

            <Text style={styles.weightText}>{props.weight}</Text>
            <Text style={styles.weightText}>{props.goalWeight}</Text>
            <Text style={styles.weightText}>{targetDate}</Text>
            <Text style={styles.weightText}>{date}</Text>




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
        backgroundColor: 'black',
    },
    header: {
        color: '#fffafa',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 25,
    },
    weightText: {
        color: '#fffafa',
        margin: 10
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