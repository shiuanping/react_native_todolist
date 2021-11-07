import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../pages/Home'
import Detail from '../pages/Detail'

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen name="HOME" component={Home} />
        <Stack.Screen name="Detail" component={Detail}  />
    </Stack.Navigator>
  );
}

export default  StackNavigator ;