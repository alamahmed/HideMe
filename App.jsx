import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Logout from "./src/screens/Logout";
import ValidateCredentials from "./src/screens/ValidateCredentials";
import ChangeCredentials from "./src/screens/ChangeCredentials";
import Dashboard from "./src/screens/Dashboard";
import Gallery from "./src/screens/Gallery";
import Register from "./src/screens/Register";
import { useSelector } from "react-redux";
import Setting from "./src/screens/Setting";


const App = (props) => {

  const Stack = createNativeStackNavigator();
  const { pinChange } = useSelector((state) => state.pinReducer); // getting the gallery

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={pinChange === '' ? 'Register' : 'Dashboard'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="ChangeCredentials" component={ChangeCredentials} />
        <Stack.Screen name="ValidateCredentials" component={ValidateCredentials} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
