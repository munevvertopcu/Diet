import React from 'react';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import SelectGoalWeight from '../components/SelectGoalWeight';
import SelectGender from '../components/SelectGender';
import SelectDateofBirth from '../components/SelectDateofBirth';
import SelectHeight from '../components/SelectHeight';
import SelectCurrentWeight from '../components/SelectCurrentWeight';
import EnterGoalWeight from '../components/EnterGoalWeight';
import { connect } from 'react-redux';

function ChooseOptions(props) {

  const progressStepsStyle = {
    activeStepIconBorderColor: "#00fa9a",
    activeStepNumColor: "white",
    activeStepIconColor: "#00fa9a",
    completedStepIconColor: "#00fa9a",
    completedProgressBarColor: "#00fa9a",
    completedCheckColor: "transparent",
    label: "hora",
    labelColor: "#00fa9a",
    progressBarColor: "#c0c0c0",
    disabledStepIconColor: "#c0c0c0"
  };

  const nextbuttonTextStyle = {
    backgroundColor: "#3584c5",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    color: "white"
  };

  const previousbuttonTextStyle = {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#3584c5",
    color: "#3584c5"
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, backgroundColor: "#fff", marginHorizontal: 10 }}>
        <ProgressSteps {...progressStepsStyle} topOffset={50}>
          <ProgressStep 
          nextBtnDisabled={!props.selectedTargetWeight ? true : false} 
          nextBtnTextStyle={nextbuttonTextStyle}>
            <SelectGoalWeight />
          </ProgressStep>
          <ProgressStep 
          nextBtnDisabled={!props.selectedGender ? true : false} 
          previousBtnTextStyle={previousbuttonTextStyle}
          nextBtnTextStyle={nextbuttonTextStyle}>
            <SelectGender />
          </ProgressStep>
          <ProgressStep 
          nextBtnDisabled={!props.inputAge ? true : false}
          previousBtnTextStyle={previousbuttonTextStyle}
          nextBtnTextStyle={nextbuttonTextStyle}>
            <SelectDateofBirth />
          </ProgressStep>
          <ProgressStep
          previousBtnTextStyle={previousbuttonTextStyle}
          nextBtnTextStyle={nextbuttonTextStyle}>
            <SelectHeight />
          </ProgressStep>
          <ProgressStep 
          previousBtnTextStyle={previousbuttonTextStyle}
          nextBtnTextStyle={nextbuttonTextStyle}>
          <SelectCurrentWeight />
          </ProgressStep>
        <ProgressStep 
        onSubmit={() => props.navigation.navigate('Progress')}
        previousBtnTextStyle={previousbuttonTextStyle}
          nextBtnTextStyle={nextbuttonTextStyle}>
        {props.selectedTargetWeight == 1 ? null : <EnterGoalWeight />}
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    selectedTargetWeight: state.selectedTargetWeight,
    selectedGender: state.selectedGender,
    inputAge: state.inputAge,

  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOptions);
