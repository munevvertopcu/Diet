//The HomeScreen will cointain:
// 1. recommended daily calorie intake
// 2. Daily dietary intake
// 3. Suggestion carousel, which can be viewd as a list, then user will be taken to suggestionscreen

//Importing the react native and react components
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ScrollView, View, Animated, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image, Dimensions } from 'react-native'
import { fetchIngredients } from '../store/actions/auth';
import { fetchUserMeals } from '../store/actions/auth';
 import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../components/Calendar'
import Carousel from '../components/Carousel'
import UserMealButton from '../components/UserMealButton'

import ProgressCircle from 'react-native-progress-circle'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const HEADER_MAX_HEIGHT = height / 2.6;
const HEADER_MIN_HEIGHT = height / 7;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const breakfast = require('../../assets/breakfast.png')
const lunch = require('../../assets/lunchbox.png')
const dinner = require('../../assets/fast-food.png')
const snacks = require('../../assets/snacks.png')

const AnimatableTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
const AnimatedCircle = Animated.createAnimatedComponent(ProgressCircle)
const AnimatedText = Animated.createAnimatedComponent(Text)

//Defining HomeScreen functional component
const HomeScreen = (props) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [toggleDrop, setToggleDrop] = useState(false)
  const [dateShown, setDateShown] = useState('Today')
  const [animation, setAnimation] = useState("slideInDown")

  const calorySuggestion = useSelector(state => state.calorySuggestion)

  const scrollY = useRef(new Animated.Value(0)).current;
  //const fade = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * .99],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * 1.05],
    extrapolate: 'clamp',
  });

  const flatListTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * .9],
    extrapolate: 'clamp',
  });

  const barOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 30, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const textTranslateY = scrollY.interpolate({
    inputRange: [50, HEADER_MAX_HEIGHT],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const dateTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, width / 2],
    extrapolate: 'clamp',
  });

 // const calorySuggestion = useSelector(state => state.nutrition.calorySuggestion)
  const caloryRef = useSelector(state => state.caloryRef)
  const nutrients = useSelector(state => state.nutrients)
  const todayMeal = useSelector(state => state.todayMeal)
  const weekSummary = useSelector(state => state.weekSummary)
  const carbDaily = useSelector(state => state.dailyCarb)
  const proteinDaily = useSelector(state => state.dailyProtein)
  const fatDaily = useSelector(state => state.dailyFat)

  const percent1 = 1 - (calorySuggestion / caloryRef)
  const percent = Math.round(percent1 * 100)

  const proteinPercent = nutrients.protein / proteinDaily
  const fatPercent = nutrients.fat / fatDaily
  const carbsPercent = nutrients.carbs / carbDaily

  const proteinPercent2 = 0 / 0
  const fatPercent2 = 0 / 0
  const carbsPercent2 = 0 / 0

  const loadIngredients= useCallback(async () => {
    try {
      //We call the Redux function which get the preferences
      await dispatch(fetchIngredients())
    } catch (err) {
    
    }
    }, [dispatch])

    const loaduserNutrients= useCallback(async () => {
      try {
        //We call the Redux function which get the preferences
        await dispatch(fetchUserMeals())
      } catch (err) {
      
      }
      }, [dispatch])

      const getData = async() => {
        setIsLoading(true)
        await loadIngredients()
        await loaduserNutrients()
        setIsLoading(false)
      }
  
  const handleSelectDate = async (date) => {
    const filtered = date.toString().split(" ")
  
    const month = date.month()
    const year = date.year()
    const day = date.date()
  
    let optDate = new Date();
    let optDay = optDate.getDate()
    let optMonth = optDate.getMonth()
    let optYear = optDate.getFullYear()
  
    if(day == optDay && month == optMonth && year == optYear){
      setDateShown("Today")
    }
    else if(day == optDay - 1 && month == optMonth && year == optYear){
      setDateShown("Yesterday")
    }
    else{
      setDateShown(filtered[0] + " " + filtered[1] + " " + filtered[2])
    }
    await dispatch(fetchUserMeals(day, month, year))
    setToggleDrop(false)
  }

  useEffect(() => {
    getData()
    
  }, [dispatch])

  console.log(todayMeal)
  //Returning the JSX code
  return(
    <View style={styles.container}>
      {toggleDrop ? (
        <Animatable.View
          useNativeDriver={true}
          duration={300}
          animation={animation}
          style={styles.modal}>

          <Calendar onSelectDate={handleSelectDate}/>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              // animation="fadeInDown"
              // useNativeDriver
              // duration={400}
              onPress={() => setToggleDrop(false)}
              style={styles.modalButton}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>

        </Animatable.View>
      ) : (
        <View>

        </View>
      )}
      <Animated.View
        useNativeDriver={true}
        style={[styles.calendarWrap, {transform: [{translateX: dateTranslateX}]}]}>
        <TouchableOpacity
          onPress={() => {
            setToggleDrop(true)
          }}
          style={styles.calendarButton}>
          <FontAwesome5 size={30} color="#fff" name="calendar-alt"/>
          <Text style={styles.calendarText}>{dateShown}</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        useNativeDriver={true}
        style={[{...styles.progressText3, opacity: barOpacity, transform: [{translateY: textTranslateY}]}]}>
        <UserMealButton />
        {/* <TouchableOpacity onPress={() => {

        }}>
          <MaterialCommunityIcons name="food-variant" size={36} color="white"/>
        </TouchableOpacity> */}
      </Animated.View>

      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>

        <View style={styles.contentWrap}>

          <View style={styles.progressWrap}>
            <AnimatedCircle
                useNativeDriver={true}
                percent={percent}
                radius={height / 10}
                borderWidth={7}
                color='#c0d401'
                shadowColor="#fff"
                bgColor='#ff6800'
                style={{opacity: barOpacity}}
                >
                {/* <View style={styles.progressText}>
                  <Animated.Text style={{ fontSize: 36, fontWeight: '600', fontStyle: 'italic', color: "#fff"}}>{calorySuggestion}</Animated.Text>
                  <Animated.Text style={{ fontSize: 16, fontWeight: '400', fontStyle: 'italic', color: "#fff"}}>Calories left</Animated.Text>
                </View> */}
            </AnimatedCircle>
          </View>

          <Animated.View
            useNativeDriver={true}
            style={[styles.progressText2, {transform: [{translateY: textTranslateY}]}]}>
            <Animated.Text style={styles.totalCals}>{calorySuggestion}</Animated.Text>
            <Animated.Text style={styles.totalCalsDesc}>kCals left</Animated.Text>
          </Animated.View>

          <Animated.View
            useNativeDriver={true}
            style={[{...styles.barWrap, opacity: barOpacity}]}>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Protein</Text>
                <Text style={styles.nutritionText2}>{nutrients.protein}g / {proteinDaily}g</Text>
              </View>
              {!nutrients.protein ? <ProgressBar progress={30} style={styles.progressBar} color='#fff'/> :
              <ProgressBar progress={proteinPercent} style={styles.progressBar} color='#c0d401'/>}
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Fat</Text>
                <Text style={styles.nutritionText2}>{nutrients.fat}g / {fatDaily}g</Text>
              </View>
              {!nutrients.fat ? <ProgressBar progress={30} style={styles.progressBar} color='#fff'/> :
              <ProgressBar progress={fatPercent} style={styles.progressBar} color='#c0d401'/>}
            </View>
            <View style={styles.nutrientWrap}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.nutritionText}>Carbs</Text>
                <Text style={styles.nutritionText2}>{nutrients.carbs}g / {carbDaily}g</Text>
              </View>
              {!nutrients.carbs ? <ProgressBar progress={30} style={styles.progressBar} color='#fff'/> :
              <ProgressBar progress={carbsPercent} style={styles.progressBar} color='#c0d401'/>}
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("nutrientdetail")
              }}
              style={styles.detailsButton}>
              <Text style={styles.detailText}>
               
              </Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </Animated.View>

        <Animated.ScrollView
          useNativeDriver={true}
          scrollEventThrottle={16}
          snapToInterval={height / 2}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
            { useNativeDriver: true },
          )}
          style={[{transform: [{translateY: flatListTranslateY}]}]}
          contentContainerStyle={styles.cardWrapper}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Daily Summary</Text>
          </View>

            <TouchableOpacity style={styles.card}>
              <Image source={breakfast} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Breakfast</Text>
                
                {todayMeal.Breakfast == undefined ? (
                  <Text style={styles.cardDesc}>0 kcals</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Breakfast} kcals</Text>
                )}
                
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Image source={lunch} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Lunch</Text>
               
                {todayMeal.Lunch == undefined ? (
                  <Text style={styles.cardDesc}>0 kcals</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Lunch} kcals</Text>
                )}
               
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <Image source={dinner} style={styles.image}/>
              <View>
                <Text style={styles.cardTitle}>Dinner</Text>
                
                {todayMeal.Dinner == undefined ? (
                  <Text style={styles.cardDesc}>0 kcals</Text>
                ) : (
                  <Text style={styles.cardDesc}>{todayMeal.Dinner} kcals</Text>
                )}
                
              </View>
            </TouchableOpacity>

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Weekly Summary</Text>
            </View>
            <View style={{}}>
              
            {weekSummary.length == 0 ? (
                <Text>No weekly meals found</Text>
                /* <ActivityIndicator size="small" color={COLORS.primaryColor}></ActivityIndicator> */
              ) : (
                <Carousel
                  style={{zIndex: 30000, position: 'absolute', backgroundColor: 'red'}}
                  cals={(weekSummary[0].cals).toString() + ' kcals'}
                  carbs={(weekSummary[0].carbs).toString() + ' g'}
                  protein={(weekSummary[0].protein).toString() + ' g'}
                  fat={(weekSummary[0].fat).toString() + ' g'}
                />
              )}
              
            </View>

        </Animated.ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modal:{
    position: 'absolute',
    width: '100%',
    top: 0,
    height: height / 2.6,
    backgroundColor: 'white',
    zIndex: 8000,
  },
  modalButton:{
    paddingVertical: 10,
    borderWidth: 1.5,
    width: '50%',
    borderColor: "#da2626",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    marginVertical: 10
  },
  header:{
    position: 'absolute',
    top:0,
    width: '100%',
    height: height / 2.6,
    backgroundColor: '#ff6800',
    marginBottom: height / 2.6,
    zIndex: 4000,
    overflow: 'hidden'
  },
  calendarWrap:{
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 6000,
  },
  titleWrap:{
    width: '90%',
    marginVertical: 10,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
  },
  calendarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarText:{
    color: "#fff",
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '700'
  },
  cardDesc:{
    fontSize: 16,
    marginLeft: 30,
    color:"#000",
    fontWeight: '400',
    marginTop: 5
  },
  contentWrap:{
    flexDirection: 'row',
    position: 'absolute',
    bottom:0,
  },
  progressWrap:{
    marginLeft: 20,
    marginBottom: 20,
    overflow: 'hidden'
  },
  totalCals:{
    fontSize: 25,
    fontWeight: '600',
    fontStyle: 'italic',
    color: "#fff"
  },
  totalCalsDesc:{
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    color: "#fff"
  },
  progressText:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText2:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 75,
    left: 50
  },
  progressText3:{
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 7000,
  },
  barWrap:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: width / 8,
    flex:1
  },
  progressBar:{
    width: width / 3,
    height: 5,
    backgroundColor: '#fff'
  },
  nutrientWrap:{
    marginVertical: 10
  },
  nutritionText:{
    color: "#fff",
    marginBottom: 5,
    fontWeight: 'bold'
  },
  nutritionText2:{
    fontSize: 14,
    position: 'absolute',
    right: 0,
    color: "#fff",
    marginBottom: 5,
    fontWeight: 'bold'
  },
  detailsButton:{
    marginTop: 10
  },
  detailText:{
    color: "#fff"
  },
  cardWrapper:{
    height: height + HEADER_SCROLL_DISTANCE / 1.4,
    position: 'absolute',
    top: height / 2.6,
    width: '100%',
    zIndex: -1000,
    alignItems: 'center',
  },
  card:{
    backgroundColor: '#fff',
    width: '90%',
    height: height / 8,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOffset: {height:2},
    shadowOpacity: 0.1,
    zIndex: 1000,
  },
  cardTitle:{
    fontSize: 20,
    marginLeft: 30,
    color:"#000",
    fontWeight: 'bold',
  },
  image:{
    marginLeft: 20,
    width: 60,
    height: 60
  },
})

//Exporting the component so that we can use it in other components
export default HomeScreen
