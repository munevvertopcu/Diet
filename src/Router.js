import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import StartPlan from './pages/StartPlan';
import ChooseOptions from './pages/ChooseOptions';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import { Provider } from 'react-redux';
import store from './pages/store';
import Progress from './pages/Progress';
import DailyCalorie from './pages/DailyCalorie';

const Stack = createNativeStackNavigator();


function Router() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="StartPlan" component={StartPlan} />
          <Stack.Screen options={{ headerShown: false }} name="ChooseOptions" component={ChooseOptions} />
          <Stack.Screen options={{ headerShown: false }} name="Progress" component={Progress} />
          <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
          <Stack.Screen options={{ headerShown: false }} name="LogIn" component={LogIn} />
          <Stack.Screen options={{ headerShown: false }} name="DailyCalorie" component={DailyCalorie} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;