import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('window')

const Calendar = (props) => {

  //Returning the JSX code
  return(
    <Animatable.View
      useNativeDriver={true}
      animation="fadeInDown"
      duration={200}
      delay={200}
      style={styles.wrapper}>
      <CalendarStrip
        scrollable
        minDate={'2022-05-29'}
        maxDate={'2023-05-01'}
        daySelectionAnimation={{type: 'background', highlightColor: 'tomato'}}
        calendarColor={{color: 'white'}}
        calendarHeaderStyle={{color: "#000", fontSize: width / 14}}
        dateNumberStyle={{color: "#000", fontSize: 22}}
        iconContainer={{flex: 0.1}}
        onDateSelected={(date) => props.onSelectDate(date)}
        style={{flex:1, height:200, paddingTop: 50, paddingBottom: 10}}
      />
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
  }
})

//Exporting the component so that we can use it in other components
export default Calendar