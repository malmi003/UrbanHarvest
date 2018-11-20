import React from 'react';
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import MainNavigator from "./MainNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";


const RootStackNavigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html 
    Login: {
      screen: LoginScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
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