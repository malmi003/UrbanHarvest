// copied and pasted from mainHeader - nothing functional
import React from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import ProduceModalScreen from "../screens/ProduceModalScreen";

export default ProduceStack = createStackNavigator(
  { 
    Produce: 
    { screen: () => <ProduceModalScreen /> }
  }
);
