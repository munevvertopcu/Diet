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
            style={[styles.item, selectedGenderOption == item.id ? styles.selectedStyle : { borderColor: '#fffafa' }]}
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
        padding: 30,
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