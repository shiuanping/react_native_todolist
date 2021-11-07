import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet} from "react-native";
import DrawerNavigator from './DrawerNavigator';

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Icon: {
    marginLeft: 15
  }
})

export default MainStackNavigator;