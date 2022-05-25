import { createStore } from 'redux';
import _ from "lodash";

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
    inputAge: 0
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

        default:
            return state;
    }
}
let store = createStore(reducers);

export default store;
