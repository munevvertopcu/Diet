import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable';
import { SearchBar } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import ParseFoodData from '../utils/ParseFoodData';

const {width,height} = Dimensions.get('window')

const NewMeal = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [search, setSearch] = useState(null)
  const [foodList, setFoodList] = useState([])
 
  //Getting the param passed from AddButton.js
  const mealType = props.route.params.meal;
 

  React.useEffect(() => {
    database()
    .ref('foods/')
    .on('value', snapshot => {
        const contentData = snapshot.val();
     const parsedData = ParseFoodData(contentData);
     setFoodList(parsedData);
    });
}, [])
 
  
  
  

  

  const renderFood = ({item}) => <Text>{item.name}</Text>

  

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
      
          <Text style={styles.mealText}>{mealType}</Text>
        
        <SearchBar
          lightTheme={true}
          platform="ios"
          cancelButtonProps={{color: "#000"}}
          containerStyle={{ backgroundColor: 'transparent'}}
          inputContainerStyle={{backgroundColor: "#e5e5e5"}}
          placeholder="Search here..."
          onChangeText={() =>{}}
          value={search}
          searchIcon={{color: "yellow"}}
        />
        
      

      <FlatList
        data={foodList}
        renderItem={renderFood}
      />

      
    </View>
  )
}



const styles = StyleSheet.create({
  mealTitleWrap:{
    position: 'absolute',
    top: 60,
    zIndex: 4000,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mealText:{
    fontSize: 18,
    color:"black",
    fontWeight: '500',
  },
  input: {
   width: '100%',
   height: 40,
   fontSize: 18,
   textAlign: 'left',
   borderColor: '#d9d9d9',
   borderBottomWidth: 1,
   color:"black"
  },
  ingredientWrap:{
    flex:1,
    backgroundColor: 'red',
  },
  ingWrap:{
    position: 'absolute',
    zIndex: 3000,
    bottom: 15,
    right: 15,
  },
  ingListButton:{
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: "tomato",
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  animationPopWrap:{
    flex:1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 7000
  },
  popupWrap:{
    backgroundColor: "#80d0c7",
    width: width / 2,
    height: width / 2,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mealAnimationTitle:{
    color:"#fff",
    fontWeight: '600',
    fontSize: 20
  },
  mealDescText:{
    color:"#fff",
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  }
})

export default NewMeal
