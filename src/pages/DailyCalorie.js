import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CommonButton from '../components/CommonButton';
import { ProgressBar } from 'react-native-paper';
import { calculateTargetDate } from '../helpers';

function DailyCalorie(props) {

    const [dailyCalorie, setDailyCalorie] = React.useState();


    React.useEffect(() => {
        if (props.selectedTargetWeight == 1) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 161;
                setDailyCalorie(bmr);
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 5;
                setDailyCalorie(bmr);
            }
        } else if (props.selectedTargetWeight == 0) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 661;
                setDailyCalorie(bmr);
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 495;
                setDailyCalorie(bmr);
            }
        }
        else if (props.selectedTargetWeight == 2) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 339;
                setDailyCalorie(bmr);
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 505;
                setDailyCalorie(bmr);
            }
        }
    }, []);

    console.log(props.selectedGender)



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Your personalized health plan is ready!</Text>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Text style={styles.weightText}>{props.weight}</Text>
                <Text style={styles.weightText}>-----</Text>
                <Text style={styles.weightText}>{props.goalWeight}</Text>
            </View>
            <Text style={{ textAlign: 'center', color: 'white' }}>
                Follow your recommendations and you will reach your goal on {calculateTargetDate(props.weight, props.goalWeight)}
            </Text>
            <View>
                <View style={styles.calTextView}>
                    <Text style={styles.calText}>Calories</Text>
                    <Text style={styles.calText}>{dailyCalorie} kcal</Text>
                </View>
                <ProgressBar progress={1} color='green' style={styles.progressBar} />
                <View style={styles.calTextView}>
                    <Text style={styles.calText}>Carbs</Text>
                    <Text style={styles.calText}>50%</Text>
                </View>
                <ProgressBar progress={0.5} color='orange' style={styles.progressBar} />
                <View style={styles.calTextView}>
                    <Text style={styles.calText}>Fat</Text>
                    <Text style={styles.calText}>30%</Text>
                </View>
                <ProgressBar progress={0.3} color='purple' style={styles.progressBar} />
                <View style={styles.calTextView}>
                    <Text style={styles.calText}>Protein</Text>
                    <Text style={styles.calText}>20%</Text>
                </View>
                <ProgressBar progress={0.2} color='blue' style={styles.progressBar} />
            </View>
            <CommonButton title='GET STARTED' onPress={null} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-between'
    },
    headerText: {
        color: 'white',
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 25
    },
    weightText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20
    },
    progressBar: {
        marginHorizontal: 20,
        marginBottom: 10,
        height: 5,
        borderRadius: 5

    },
    calTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 5,
    },
    calText: {
        color: 'white',
        fontSize: 15
    }
});

function mapStateToProps(state) {
    return {
        weight: state.weight,
        height: state.height,
        goalWeight: state.goalWeight,
        selectedGender: state.selectedGender,
        selectedTargetWeight: state.selectedTargetWeight,
        inputAge: state.inputAge,
    }
}
function mapDispatchToProps(dispatch) {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyCalorie);