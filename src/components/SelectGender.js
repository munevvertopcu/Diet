import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


const DATA = [
    {
        id: '0',
        title: 'FEMALE',
    },
    {
        id: '1',
        title: 'MALE',
    },
]

function SelectGender(props) {
    const [selectedGenderOption, setSelectedGenderOption] = React.useState(props.selectedGender);

    React.useEffect(() => {
        setSelectedGenderOption(props.selectedGender);
    })

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                props.updateSelectedGender(item.id);
            }}
            style={[styles.item, selectedGenderOption == item.id ? styles.selectedStyle : { borderColor: '#696969' }]}
        >
            <Text style={styles.itemText}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
                <Text style={styles.text}>Great, let's continue!</Text>
                <Text style={styles.textHeader}>What's your gender?</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between',
    },
    text: {
        color: '#762639',
        marginBottom: 15,
        textAlign: 'center',
        marginHorizontal:20,
        marginTop: 20
    },
    textHeader: {
        fontSize: 25,
        color: '#762639',
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
        color: '#762639',
        fontSize: 15,
        fontWeight: 'bold'
    },
    selectedStyle: {
        borderColor: '#fa7d07',
        borderWidth: 3
    },
    
})

function mapStateToProps(state) {
    return {
        selectedGender: state.selectedGender,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedGender: (param) => dispatch({
            type: 'UPDATE-GENDER', payload: {
                selectedGender: param,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGender);