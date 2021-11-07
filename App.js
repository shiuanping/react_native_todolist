import React from 'react';
import { StyleSheet } from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator'

export default function App() {
  return (
    <MainStackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
