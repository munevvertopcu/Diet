import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import StartPlan from './pages/StartPlan';
import ChooseOptions from './pages/ChooseOptions';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';
import { Provider } from 'react-redux';
import store from './store/store';
import Progress from './pages/Progress';
import DailyCalorie from './pages/DailyCalorie';
import Profile from './pages/Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddButton from './pages/AddButton';
import HomeScreen from './pages/HomeScreen';
import NewMeal from './pages/NewMeal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Sayfa() {
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#fff",
      tabBarActiveBackgroundColor: "#ff6800",
      tabBarInactiveBackgroundColor: "#ff6800",
      
      
      headerShown: false,
      tabBarStyle: {
        borderWidth: 1,
      },
      style: {
        backgroundColor: "#171717",
        
        
      },
    }}>
      <Tab.Screen name='Daily' component={HomeScreen} options={({color}) => ({
        tabBarIcon: () => {
          return <FontAwesome5 name="home" size={24} color="#fff" />
        },
        headerShown: false
      })}/>
      <Tab.Screen name="Add" component={() => null} options={({navigation}) => ({
        tabBarIcon: () => <AddButton navigation={navigation}/>,
        headerShown: false
      })}
      />
      {/* <Tab.Screen name="AddButton" component={() => null} options={{
       tabBarIcon: props => (
         <Ionicons name="ios-add" size={props.size} color={props.color}/>
       ),
     }}
     listeners={
       ({navigation}) => ({
         tabPress: event => {
           event.preventDefault();
           navigation.navigate("CreateNew");
         }
       })
     }/> */}
      <Tab.Screen name="Profile" component={Profile} options={({color}) => ({
        tabBarIcon: () => {
          return <FontAwesome5 name="user-alt" size={24} color="#fff" />
        },
        headerShown: false
      })} />
      <Tab.Screen name="NewMeal" component={NewMeal} options={{
    tabBarButton: () => null,
    tabBarVisible: false,
    headerShown: false
  }} />
    </Tab.Navigator>
  );
}




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
          <Stack.Screen
            name="Sayfa"
            component={Sayfa}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Router;