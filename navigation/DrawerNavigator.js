import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  >
      <Drawer.Screen name="Today" component={StackNavigator} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;