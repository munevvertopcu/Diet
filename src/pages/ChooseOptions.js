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
  };

  

  
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flex: 1, backgroundColor: "black", marginHorizontal: 10 }}>
        <ProgressSteps {...progressStepsStyle} topOffset={50}>
          <ProgressStep nextBtnDisabled={!props.selectedTargetWeight ? true : false}>
            <SelectGoalWeight />
          </ProgressStep>
          <ProgressStep nextBtnDisabled={!props.selectedGender ? true : false}>
            <SelectGender />
          </ProgressStep>
          <ProgressStep nextBtnDisabled={!props.inputAge ? true : false}>
            <SelectDateofBirth />
          </ProgressStep>
          <ProgressStep>
            <SelectHeight />
          </ProgressStep>
          <ProgressStep >
          <SelectCurrentWeight />
          </ProgressStep>
        <ProgressStep onSubmit={() => props.navigation.navigate('Progress')}>
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
