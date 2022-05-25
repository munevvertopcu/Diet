import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-picker-scrollview';
import { connect } from 'react-redux';

let cmHeightArray = [];
for (let i = 10; i <= 150; i++) {
    cmHeightArray.push(i)
}

let cmHeightFloatPointArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function EnterGoalWeight(props) {
    const [selectedBaseIndex, setSelectedGoalWeightBaseIndex] = React.useState(props.selectedGoalWeightBaseIndex);
    const [selectedFloatingIndex, setSelectedGoalWeightFloatingIndex] = React.useState(props.selectedGoalWeightFloatingIndex);
    const [selectedGoalWeightBase, setSelectedGoalWeightBase] = React.useState(cmHeightArray[selectedBaseIndex]);
    const [selectedFloatingPoint, setSelectedFloatingPoint] = React.useState(cmHeightFloatPointArray[selectedFloatingIndex]);
    const [selectedGoalWeight, setSelectedGoalWeight] = React.useState(props.goalWeight);

    React.useEffect(() => {
        setSelectedGoalWeightBaseIndex(props.selectedGoalWeightBaseIndex);
        setSelectedGoalWeightFloatingIndex(props.selectedGoalWeightFloatingIndex);
        setSelectedGoalWeight(props.goalWeight);
    })

    React.useEffect(() => {
        let stringGoalWeightBase = selectedGoalWeightBase?.toString();
        let stringFloatingPoint = selectedFloatingPoint?.toString();
        let resultingGoalWeight = stringGoalWeightBase + "." + stringFloatingPoint;
        props.updateGoalWeight(parseFloat(resultingGoalWeight));
    }, [selectedGoalWeightBase, selectedFloatingPoint]);

    React.useEffect(() => {
        console.log(selectedGoalWeight)
    }, [selectedGoalWeight])

    // React.useEffect(() => {
    //     console.log(selectedBaseIndex)
    // }, [selectedBaseIndex])


        return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Thanks, you're doing great!</Text>
                <Text style={styles.textHeader}>What's your goal weight?</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={cmHeightArray}
                    selectedIndex={selectedBaseIndex}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#ffffff'}
                    highlightColor={'#d8d8d8'}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        props.updateSelectedBaseGoalWeight(selectedIndex);
                        setSelectedGoalWeightBase(data);

                    }}
                />
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={[',']}
                    selectedIndex={0}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#ffffff'}
                    highlightColor={'#d8d8d8'}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={() => { }}
                />
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={cmHeightFloatPointArray}
                    selectedIndex={selectedFloatingIndex}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#ffffff'}
                    highlightColor={'#d8d8d8'}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        props.updateSelectedFloatingGoalWeight(selectedIndex);
                        setSelectedFloatingPoint(data);
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: 'black',
        marginBottom: 15
    },
    textHeader: {
        fontSize: 25,
        color: 'black',
    },
    textView: {
        alignItems: 'center',
        margin: 20,
        marginBottom: 25
    },
    item: {
        padding: 25,
        marginVertical: 10,
        marginHorizontal: 16,
        borderColor: '#fffafa',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center'
    },
    itemText: {
        color: '#fffafa'
    },
    selectedStyle: {
        borderColor: '#00fa9a',
        borderWidth: 3
    },
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

function mapStateToProps(state) {
    return {
        selectedGoalWeightBaseIndex: state.selectedGoalWeightBaseIndex,
        selectedGoalWeightFloatingIndex: state.selectedGoalWeightFloatingIndex,
        goalWeight: state.goalWeight
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedBaseGoalWeight: (param) => dispatch({
            type: 'UPDATE-BASE-GOAL-WEIGHT', payload: {
                selectedGoalWeightBaseIndex: param,
            }
        }),
        updateSelectedFloatingGoalWeight: (param) => dispatch({
            type: 'UPDATE-FLOAT-GOAL-WEIGHT', payload: {
                selectedGoalWeightFloatingIndex: param,
            }
        }),
        updateGoalWeight: (param) => dispatch({
            type: 'UPDATE-GOAL-WEIGHT', payload: {
                goalWeight: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterGoalWeight);