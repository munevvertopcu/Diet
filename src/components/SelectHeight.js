import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { connect } from 'react-redux';


let cmHeightArray = [];
for (let i = 130; i <= 230; i++) {
    cmHeightArray.push(i)
}

let cmHeightFloatPointArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function SelectHeight(props) {

    const [selectedBaseIndex, setSelectedHeightBaseIndex] = React.useState(props.selectedHeightBaseIndex);
    const [selectedFloatingIndex, setSelectedHeightFloatingIndex] = React.useState(props.selectedHeightFloatingIndex);
    const [selectedHeightBase, setSelectedHeightBase] = React.useState(cmHeightArray[selectedBaseIndex]);
    const [selectedFloatingPoint, setSelectedFloatingPoint] = React.useState(cmHeightFloatPointArray[selectedFloatingIndex]);
    const [selectedHeigth, setSelectedHeight] = React.useState(props.height);

    React.useEffect(() => {
        setSelectedHeightBaseIndex(props.selectedHeightBaseIndex);
        setSelectedHeightFloatingIndex(props.selectedHeightFloatingIndex);
        setSelectedHeight(props.height);
    })

    React.useEffect(() => {
        let stringHeightBase = selectedHeightBase?.toString();
        let stringFloatingPoint = selectedFloatingPoint?.toString();
        let resultingHeight = stringHeightBase + "." + stringFloatingPoint;
        props.updateHeight(parseFloat(resultingHeight));
    }, [selectedHeightBase, selectedFloatingPoint]);

    React.useEffect(() => {
        console.log(selectedHeigth)
    }, [selectedHeigth])

    React.useEffect(() => {
        console.log(selectedBaseIndex)
    }, [selectedBaseIndex])


    // console.log('------------')
    // console.log(selectedBaseIndex)
    // console.log(selectedHeightBase)
    // console.log(selectedFloatingIndex)
    // console.log(selectedFloatingPoint)
    // console.log('------------')



    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Thanks, you're doing great!</Text>
                <Text style={styles.textHeader}>What's your height?</Text>
            </View>
            <View style={{ flexDirection: 'row', borderWidth: 2, borderRadius: 7, marginHorizontal: 8, borderColor :'#676b6d' }}>
                <ScrollPicker
                    ref={(sp) => { sp = sp }}

                    dataSource={cmHeightArray}
                    selectedIndex={selectedBaseIndex}
                    itemHeight={50}
                    wrapperHeight={250}
                    wrapperColor='#a7afb3'
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
                        props.updateSelectedBaseHeight(selectedIndex);
                        setSelectedHeightBase(data)
                    }}
                />

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
                        props.updateSelectedFloatingHeight(selectedIndex);
                        setSelectedFloatingPoint(data)
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
        selectedHeightBaseIndex: state.selectedHeightBaseIndex,
        selectedHeightFloatingIndex: state.selectedHeightFloatingIndex,
        height: state.height
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedBaseHeight: (param) => dispatch({
            type: 'UPDATE-BASE-HEIGHT', payload: {
                selectedHeightBaseIndex: param,
            }
        }),
        updateSelectedFloatingHeight: (param) => dispatch({
            type: 'UPDATE-FLOAT-HEIGHT', payload: {
                selectedHeightFloatingIndex: param,
            }
        }),
        updateHeight: (param) => dispatch({
            type: 'UPDATE-HEIGHT', payload: {
                height: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectHeight);
