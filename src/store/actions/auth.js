import  AsyncStorage  from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import ParseFoodData from '../../utils/ParseFoodData'

export const AUTHENTICATE = "AUTHENTICATE"

export const ADD_MEAL = 'ADD_MEAL'
export const SET_USERMEAL = 'SET_USERMEAL'
export const SET_INGREDIENTS = 'SET_INGREDIENTS'
export const ADD_INGREDIENT =  'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const LOGOUT = "LOGOUT"







export const signup = (email, password, name, gender, age, weight, userHeight) => {
  return async dispatch => {
    const response = await auth().createUserWithEmailAndPassword(email, password)
    const user = await auth().currentUser;

    const idToken = await user.getIdToken()

    //Updating user displayName with firebase method updateProfile
    const updateUser = await user.updateProfile({
      displayName: name,
    })
    //Creating an empty object
    let updates = {}

    //Creating the obj to push to DB
    let userData = {
      gender: gender,
      age: age,
      weight: weight,
      userHeight: userHeight,
    }
    updates['users/'+user.uid] = userData;

    await database().ref().update(updates)

    dispatch(authenticate(user.uid, idToken))
    saveDataToStorage(idToken, user.uid, name)
  }
}

  export const authenticate = (userId, token) => {
    return dispatch => {
      // dispatch(setLogoutTimer(expiryTime))
      dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
  }

  const saveDataToStorage = (token, userId, displayName) => {
    AsyncStorage.setItem('userData', JSON.stringify({
      token: token,
      userId: userId,
      displayName: displayName
    }))
  }

  export const login = (email, password) => {
    return async dispatch => {
      const response = await auth().signInWithEmailAndPassword(email, password)
  
      const user = await auth().currentUser;
      const idToken = await user.getIdToken()
  
      dispatch(authenticate(user.uid, idToken))
      saveDataToStorage(idToken, user.uid, user.displayName)
    }
  }

  export const logout = () => {

    
    return { type: LOGOUT }
  }



  export const fetchIngredients = () => {
    return async(dispatch, getState) => {
      const userId = getState().userId
    const token = getState().token

    const updatedIngredients = getState()["mealIngredients"].map(prod => prod);

    try {
      const response = await fetch(`https://dietnutrition-ea78c-default-rtdb.firebaseio.com/foods.json?auth=${token}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
     

      const resData = await response.json();
      const parsedData = ParseFoodData(resData);

      

      

      dispatch({ type: SET_INGREDIENTS, ingredients: parsedData, mealIngredients: updatedIngredients })
  
      } catch (error) {
        throw new Error('error', error);
      }
    }
  }


  export const fetchUserMeals = (userDay, userMonth, userYear) => {
    return async(dispatch, getState) => {
      const userId = getState().userId
      const token = getState().token
      const age = getState().inputAge
      const gender = getState().selectedGender
  
      let date;
      let day;
      let month;
      let year;
  
      if(userDay == undefined || userMonth == undefined || userYear == undefined){
        date = new Date();
        day = date.getDate()
        month = date.getMonth()
        year = date.getFullYear()
      }else{
        day = userDay
        month = userMonth
        year = userYear
      }
  
      const userNutrition = await fetch(`https://dietnutrition-ea78c-default-rtdb.firebaseio.com/userMeals/${userId}.json?auth=${token}`)
  
      if (!userNutrition.ok) {
        throw new Error('Something went wrong');
      }
  
      const mealData = await userNutrition.json()
  
  
      const nutritionData = Object.values(mealData)
  
      dispatch({ type: SET_USERMEAL, nutritientSuggestions: nutritionData, inputAge: age, selectedGender: gender, day: day, month: month, year: year })
    }
  }


  export const addIngredient = (ingredientId) => {
    return { type: ADD_INGREDIENT, ingredientId: ingredientId }
}


export const deleteIngredient = (ingredientId) => {
  return { type: DELETE_INGREDIENT, ingredientId: ingredientId }
}


export const addMeal = (mealType) => {
  return async(dispatch, getState) => {
    const userId = getState().userId
    const token = getState().token
    const ingredients = getState().mealIngredients

    let date = new Date();
    const timestamp = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    }

    try {
      const response = await fetch(`https://dietnutrition-ea78c-default-rtdb.firebaseio.com/userMeals/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients,
          timestamp,
          mealType
        })
      });

      dispatch({ type: ADD_MEAL })

    } catch (error) {
      console.log(error);
    }

  }
}