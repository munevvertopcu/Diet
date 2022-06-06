import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from "lodash";

import { AUTHENTICATE } from './actions/auth';

import { ADD_MEAL } from './actions/auth'
import { SET_USERMEAL } from './actions/auth'
import { SET_INGREDIENTS } from './actions/auth'
import { ADD_INGREDIENT } from './actions/auth'
import { DELETE_INGREDIENT } from './actions/auth'


const initialState = {
    selectedWeightBaseIndex: 0,
    selectedWeightFloatingIndex: 0,
    weight: 0,
    selectedHeightBaseIndex: 0,
    selectedHeightFloatingIndex: 0,
    height: 0,
    selectedGoalWeightBaseIndex: 0,
    selectedGoalWeightFloatingIndex: 0,
    goalWeight: 0,
    selectedGender: null,
    selectedTargetWeight: null,
    inputAge: 0,
    dailyCals: 0,

    token: null,
    userId: null,

    ingredients: [],
    nutritientSuggestions: [],
    todayMeal: {},
    weekSummary: [],
    userMeals: [],
    calorySuggestion: null,
    caloryRef: null,
    nutrients: [],
    mealIngredients: []
};

function reducers(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE-BASE-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedWeightBaseIndex = _.cloneDeep(data.selectedWeightBaseIndex);
            return { ...state, selectedWeightBaseIndex: incomingSelectedWeightBaseIndex };
        }
        case 'UPDATE-FLOAT-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedWeightFloatIndex = _.cloneDeep(data.selectedWeightFloatingIndex);
            return { ...state, selectedWeightFloatingIndex: incomingSelectedWeightFloatIndex };
        }
        case 'UPDATE-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingWeight = _.cloneDeep(data.weight);
            return { ...state, weight: incomingWeight };
        }
        case 'UPDATE-BASE-HEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedHeightBaseIndex = _.cloneDeep(data.selectedHeightBaseIndex);
            return { ...state, selectedHeightBaseIndex: incomingSelectedHeightBaseIndex };
        }
        case 'UPDATE-FLOAT-HEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedHeightFloatIndex = _.cloneDeep(data.selectedHeightFloatingIndex);
            return { ...state, selectedHeightFloatingIndex: incomingSelectedHeightFloatIndex };
        }
        case 'UPDATE-HEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingHeight = _.cloneDeep(data.height);
            return { ...state, height: incomingHeight };
        }
        case 'UPDATE-BASE-GOAL-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedGoalWeightBaseIndex = _.cloneDeep(data.selectedGoalWeightBaseIndex);
            return { ...state, selectedGoalWeightBaseIndex: incomingSelectedGoalWeightBaseIndex };
        }
        case 'UPDATE-FLOAT-GOAL-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedGoalWeightFloatIndex = _.cloneDeep(data.selectedGoalWeightFloatingIndex);
            return { ...state, selectedGoalWeightFloatingIndex: incomingSelectedGoalWeightFloatIndex };
        }
        case 'UPDATE-GOAL-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingGoalWeight = _.cloneDeep(data.goalWeight);
            return { ...state, goalWeight: incomingGoalWeight };
        }
        case 'UPDATE-GENDER': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedGender = _.cloneDeep(data.selectedGender);
            return { ...state, selectedGender: incomingSelectedGender };
        }
        case 'UPDATE-TARGET-WEIGHT': {
            const data = _.cloneDeep(action.payload);
            const incomingSelectedTargetWeight = _.cloneDeep(data.selectedTargetWeight);
            return { ...state, selectedTargetWeight: incomingSelectedTargetWeight };
        }
        case 'UPDATE-INPUT-AGE': {
            const data = _.cloneDeep(action.payload);
            const incomingInputAge = _.cloneDeep(data.inputAge);
            return { ...state, inputAge: incomingInputAge };
        }
        case 'UPDATE-DAILY-CALORIE': {
            const data = _.cloneDeep(action.payload);
            const incomingDailyCalorie = _.cloneDeep(data.dailyCals);
            return { ...state, dailyCals: incomingDailyCalorie };
        }
        case AUTHENTICATE: {
            return { ...state, token: action.token, userId: action.userId }
        }
        case SET_INGREDIENTS: {

            return { ...state, ingredients: action.ingredients, mealIngredients: action.mealIngredients}
        }
        case ADD_MEAL: {
            return { ...state, mealIngredients: [] }
        }
        case ADD_INGREDIENT: {
            const ingredientToAdd = state.ingredients.find(ingredient => ingredient.id === action.ingredientId);
            return { ...state, mealIngredients: state.mealIngredients.concat(ingredientToAdd) }
        }
        case DELETE_INGREDIENT: {
            const ingredientToRemove = state.mealIngredients.find(ingredient => ingredient.id === action.ingredientId);
            const ingredientHolder = [...state.mealIngredients]
            const updatedIndex = ingredientHolder.findIndex(ingredient => ingredient.id === ingredientToRemove.id)
            ingredientHolder.splice(updatedIndex, 1)
            return { ...state, mealIngredients: ingredientHolder }
        }
        case SET_USERMEAL: {
            let cals = 0
            let nutrientsTotal = 0;
            let refCals;
            let fatTotal = 0;
            let proteinTotal = 0;
            let carbsTotal = 0;

            let weekCals = 0
            let weekFat = 0;
            let weekProtein = 0;
            let weekCarbs = 0;

            let mealsOfDay = {}
            let summary = []

           

            refCals = 3865


            let now = moment();

            const meals = action.nutritientSuggestions

            for (var meal = 0; meal < meals.length; meal++) {
                const ingredientList = meals[meal].ingredients
                const timestamp = meals[meal].timestamp

                let newMonth = timestamp.month + 1
                let monthLetter;
                let dayLetter;
                if (newMonth.toString().length < 2) {
                    monthLetter = `0${monthPlus}`
                }
                else {
                    monthLetter = newMonth.toString()
                }
                if (timestamp.day.toString().length < 2) {
                    dayLetter = `0${timestamp.day.toString()}`
                } else {
                    dayLetter = timestamp.day.toString()
                }

                let dateString = `${timestamp.year}-${monthLetter}-${dayLetter}`

                if (now.isoWeek() == moment(dateString).isoWeek()) {
                    for (var ingredient = 0; ingredient < ingredientList.length; ingredient++) {
                        //do one read operation from array per round
                        const item = ingredientList[ingredient]

                        const weeklyCalories = item.energi2.split(/[=}]/)[2]
                        const weeklyFat = item.fat.split(/[=}]/)[2]
                        const weeklyCarbs = item.carbs.split(/[=}]/)[2]
                        const weeklyProtein = item.protein.split(/[=}]/)[2]
                        weekCals += parseInt(weeklyCalories)
                        weekFat += parseInt(weeklyFat)
                        weekCarbs += parseInt(weeklyCarbs)
                        weekProtein += parseInt(weeklyProtein)
                    }
                }

                if (timestamp.day == action.day && timestamp.month == action.month && timestamp.year == action.year) {
                    for (var ingredient = 0; ingredient < ingredientList.length; ingredient++) {
                        //do one read operation from array per round
                        const item = ingredientList[ingredient]

                        const calories = item.energi2.split(/[=}]/)[2]
                        const fat = item.fat.split(/[=}]/)[2]
                        const carbs = item.carbs.split(/[=}]/)[2]
                        const protein = item.protein.split(/[=}]/)[2]
                        cals += parseInt(calories)
                        nutrientsTotal = nutrientsTotal + parseInt(fat) + parseInt(carbs) + parseInt(protein)
                        fatTotal += parseInt(fat)
                        carbsTotal += parseInt(carbs)
                        proteinTotal += parseInt(protein)

                        mealsOfDay[meals[meal].mealType] = parseInt(calories)
                    }
                }
            }
            summary.push({ cals: weekCals, protein: weekProtein, carbs: weekCarbs, fat: weekFat })

            let nutrientsObj = {
                total: nutrientsTotal,
                fat: fatTotal,
                carbs: carbsTotal,
                protein: proteinTotal
            }

            const suggestedCals = refCals - cals

            return { ...state, nutritientSuggestions: action.nutritientSuggestions, calorySuggestion: suggestedCals, caloryRef: refCals, nutrients: nutrientsObj, todayMeal: mealsOfDay, weekSummary: summary }
        }
        default:
            return state;
    }
}
let store = createStore(reducers, applyMiddleware(thunk));

export default store;
