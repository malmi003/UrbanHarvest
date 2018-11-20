import React from 'react';
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import MainNavigator from "./MainNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AuthNavigator from "./AuthNavigator";

const RootStackNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html 
    Auth: {
      screen: AuthNavigator
    },
    Main: {
      screen: MainNavigator,
    }
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  };
};