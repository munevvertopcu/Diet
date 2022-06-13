import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CommonButton from '../components/CommonButton';
import { ProgressBar } from 'react-native-paper';
import { calculateTargetDate } from '../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';



function DailyCalorie(props) {

    const [dailyCalorie, setDailyCalorie] = React.useState(props.dailyCals);
    const [carbonhydrate, setCarbonhydrate] = React.useState(props.dailyCarb);
    const [protein, setProtein] = React.useState(props.dailyProtein);
    const [fat, setFat] = React.useState(props.dailyFat);






    React.useEffect(() => {
        setDailyCalorie(props.dailyCals);
        setCarbonhydrate(props.dailyCarb);
        setProtein(props.dailyProtein);
        setFat(props.dailyFat);
    })


    React.useEffect(() => {
        if (props.selectedTargetWeight == 1) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 161;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 5;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            }
        } else if (props.selectedTargetWeight == 0) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 661;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) - 495;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            }
        }
        else if (props.selectedTargetWeight == 2) {
            if (props.selectedGender == 0) {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 339;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            } else {
                let bmr = (10 * props.weight) + (6.25 * props.height) - (5 * props.inputAge) + 505;
                let bmrResult = bmr * 1.3;
                props.updateDailyCalorie(parseInt(bmrResult));
            }
        }
    }, []);

    React.useEffect(() => {
        let protein = (dailyCalorie * 0.2) / 4;
        props.updateDailyProtein(parseInt(protein));
        let fat = (dailyCalorie * 0.3) / 9;
        props.updateDailyFat(parseInt(fat));
        let carb = (dailyCalorie * 0.5) / 4;
        props.updateDailyCarb(parseInt(carb));

    }, [dailyCalorie])

    console.log(props.selectedGender)



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Your personalized health plan is ready!</Text>
            <View style={{marginBottom: 35}}>
            <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={styles.weightText}>{props.weight}</Text>
                <Ionicons style={{}} color="#fa7f0b" size={40} name="arrow-forward-circle" />
                <Text style={styles.weightText}>{props.goalWeight}</Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center', color: '#762639', fontWeight: 'bold' }}>
                    Follow your recommendations and you will reach your goal on
                </Text>
                <Text style={{ textAlign: 'center', color: '#762639', fontWeight: 'bold' }}>{calculateTargetDate(props.weight, props.goalWeight)}</Text>
            </View>
            </View>
            <View>
                <Text style={{color: "#762639", fontWeight:'bold', textAlign: 'center', marginBottom: 18}}>Daily nutritional recommendations</Text>
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
            <CommonButton title='GET STARTED' onPress={() => props.navigation.navigate('Sayfa')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#762639',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 25
    },
    weightText: {
        color: '#762639',
        fontSize: 30,
        marginHorizontal: 15,
        fontWeight: 'bold'
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
        color: '#762639',
        fontSize: 17,
        fontWeight: 'bold'
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
        dailyCals: state.dailyCals,
        dailyCarb: state.dailyCarb,
        dailyProtein: state.dailyProtein,
        dailyFat: state.dailyFat
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateDailyCalorie: (param) => dispatch({
            type: 'UPDATE-DAILY-CALORIE', payload: {
                dailyCals: param,
            }
        }),
        updateDailyCarb: (param) => dispatch({
            type: 'UPDATE-DAILY-CARBONHYDRATE', payload: {
                dailyCarb: param,
            }
        }),
        updateDailyProtein: (param) => dispatch({
            type: 'UPDATE-DAILY-PROTEIN', payload: {
                dailyProtein: param,
            }
        }),
        updateDailyFat: (param) => dispatch({
            type: 'UPDATE-DAILY-FAT', payload: {
                dailyFat: param,
            }
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyCalorie);