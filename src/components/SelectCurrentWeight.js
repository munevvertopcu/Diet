import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { connect } from 'react-redux';

let cmHeightArray = [];
for (let i = 25; i <= 150; i++) {
    cmHeightArray.push(i)
}

let cmHeightFloatPointArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function SelectCurrentWeight(props) {
    const [selectedBaseIndex, setSelectedWeightBaseIndex] = React.useState(props.selectedWeightBaseIndex);
    const [selectedFloatingIndex, setSelectedWeightFloatingIndex] = React.useState(props.selectedWeightFloatingIndex);
    const [selectedWeightBase, setSelectedWeightBase] = React.useState(cmHeightArray[selectedBaseIndex]);
    const [selectedFloatingPoint, setSelectedFloatingPoint] = React.useState(cmHeightFloatPointArray[selectedFloatingIndex]);
    const [selectedWeight, setSelectedWeight] = React.useState(props.weight);
    
    React.useEffect(() => {
        setSelectedWeightBaseIndex(props.selectedWeightBaseIndex);
        setSelectedWeightFloatingIndex(props.selectedWeightFloatingIndex);
        setSelectedWeight(props.weight);
    })

   

    React.useEffect(() => {
        let stringWeightBase = selectedWeightBase?.toString();
        let stringFloatingPoint = selectedFloatingPoint?.toString();
        let resultingWeight = stringWeightBase + "." + stringFloatingPoint;
        props.updateWeight(parseFloat(resultingWeight));
    }, [selectedWeightBase, selectedFloatingPoint]);

    React.useEffect(() => {
        console.log(selectedWeight)
    }, [selectedWeight])

    React.useEffect(() => {
        console.log(selectedBaseIndex)
    }, [selectedBaseIndex])

    
    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Thanks, you're doing great!</Text>
                <Text style={styles.textHeader}>What's your current weight?</Text>
            </View>
            <View style={{ flexDirection: 'row', borderWidth: 2, borderRadius: 7, marginHorizontal: 8, borderColor :'#676b6d' }}>
                {/* Base Weight */}
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={cmHeightArray}
                    selectedIndex={selectedBaseIndex}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#a7afb3'}
                    highlightColor={'#676b6d'}
                    highlightBorderWidth={2}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text style={styles.picker}>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        props.updateSelectedBaseWeight(selectedIndex);
                        setSelectedWeightBase(data)
                       
                    }}
                />
                {/* Comma */}
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={[',']}
                    selectedIndex={0}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#a7afb3'}
                    highlightColor={'#676b6d'}
                    highlightBorderWidth={2}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text style={styles.picker}>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={() => { }}
                />
                {/* Floating Scroll */}
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={cmHeightFloatPointArray}
                    selectedIndex={selectedFloatingIndex}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor={'#a7afb3'}
                    highlightColor={'#676b6d'}
                    highlightBorderWidth={2}
                    renderItem={(data, index, isSelected) => {
                        return (
                            <View>
                                <Text style={styles.picker}>{data}</Text>
                            </View>
                        )
                    }}
                    onValueChange={(data, selectedIndex) => {
                        props.updateSelectedFloatingWeight(selectedIndex);
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
    picker: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }


})

function mapStateToProps(state) {
    return {
        selectedWeightBaseIndex: state.selectedWeightBaseIndex,
        selectedWeightFloatingIndex: state.selectedWeightFloatingIndex,
        weight: state.weight
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedBaseWeight: (param) => dispatch({
            type: 'UPDATE-BASE-WEIGHT', payload: {
                selectedWeightBaseIndex: param,
            }
        }),
        updateSelectedFloatingWeight: (param) => dispatch({
            type: 'UPDATE-FLOAT-WEIGHT', payload: {
                selectedWeightFloatingIndex: param,
            }
        }),
        updateWeight: (param) => dispatch({
            type: 'UPDATE-WEIGHT', payload: {
                weight: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrentWeight);
