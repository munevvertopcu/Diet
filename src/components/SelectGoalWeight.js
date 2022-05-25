import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


const DATA = [
    {
        id: '0',
        title: 'LOSE WEIGHT',
    },
    {
        id: '1',
        title: 'MAINTAIN WEIGHT',
    },
    {
        id: '2',
        title: 'GAIN WEİGHT',
    },
]

function SelectGoalWeight(props) {
    const [selectedTargetWeightOption, setselectedTargetWeightOption] = React.useState(props.selectedTargetWeight);

    React.useEffect(() => {
        setselectedTargetWeightOption(props.selectedTargetWeight);
    })


    const renderItem = ({item}) => (
        <TouchableOpacity 
        onPress = {() => {
            props.updateSelectedTargetWeight(item.id);
        }}
        style = {[styles.item, selectedTargetWeightOption == item.id ? styles.selectedStyle : {borderColor: '#fffafa'}]}
        >
        <Text style={styles.itemText}>
        {item.title}
        </Text>
        </TouchableOpacity>
      );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Let's get to know you better!</Text>
            <Text style={styles.textHeader}>What goal do you have in mind?</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: '#fffafa',
        marginBottom: 15,
        textAlign: 'center',
        marginHorizontal:20,
        marginTop: 20
    },
    textHeader: {
        fontSize: 25,
        color: '#fffafa',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20
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
})

function mapStateToProps(state) {
    return {
        selectedTargetWeight: state.selectedTargetWeight,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedTargetWeight: (param) => dispatch({
            type: 'UPDATE-TARGET-WEIGHT', payload: {
                selectedTargetWeight: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGoalWeight);