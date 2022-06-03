import { AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const UPDATE_CALORIE_SUG = "UPDATE-CALORIE-SUG"



export const updateCal = (state) => {
    return  dispatch => {
     
  
    dispatch({type: UPDATE_CALORIE_SUG, dailycal: (state + 1) })
    }
  }

  export const authenticate = (userId) => {
    return dispatch => {
      // dispatch(setLogoutTimer(expiryTime))
      dispatch({ type: AUTHENTICATE, userId: userId })
    }
  }

  const saveDataToStorage = ( userId, displayName) => {
    AsyncStorage.setItem('userData', JSON.stringify({
      token: token,
      userId: userId,
      displayName: displayName
    }))
  }