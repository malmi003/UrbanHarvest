import React, { Component } from 'react';
import { Platform, Text, ScrollView, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView, createSwitchNavigator } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";

import Colors from "../constants/Colors";
import Icon from "../components/Icon";


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/urbanHarvestLogo.png')}
        style={{ width: 250, height: 50 }}
      />
    );
  }
}

class DrawerButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {this.props.navigation.openDrawer()}}
        >
        <Icon
          name={
            Platform.OS === 'ios'
              ? 'ios-menu'
              : 'md-menu'
          }
          size={40}
          style={{ paddingLeft: 20 }}
          color={Colors.white}
        />
      </TouchableOpacity >
    )
  }
}

class HeaderViewToggleBtn extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        {/* rounded corners still not working */}
        <TouchableOpacity style={styles.leftRounded}>
          <Text
            style={this.props.style1}
            onPress={this.props.nav1}
          >Map View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightRounded}>
          <Text
            style={this.props.style2}
            onPress={this.props.nav2}
          >List View
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <Text style={{paddingLeft:22}}>place your various nav links here!</Text>
    </SafeAreaView>
  </ScrollView>
);


// STACK AND NAVIGATION START BELOW HERE
const headerToggleStack = createStackNavigator(
  {
    Map: {
      screen: () => <MapScreen />,
      navigationOptions: ({ navigation }) => ({
        headerTitle:
          <HeaderViewToggleBtn
            style1={styles.inactiveCenterHeaderButton}
            style2={styles.activeCenterHeaderButton}
            nav1={() => navigation.navigate("Map")}
            nav2={() => navigation.navigate("List")}
          />,

      })
    },
    List: {
      screen: () => <ListScreen />,
      navigationOptions: ({ navigation }) => ({
        headerTitle:
          <HeaderViewToggleBtn
            style1={styles.activeCenterHeaderButton}
            style2={styles.inactiveCenterHeaderButton}
            nav1={() => navigation.navigate("Map")}
            nav2={() => navigation.navigate("List")}
          />,
      }),
    },
  },
  {
    initialRouteName: 'Map',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.headerGreen,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <DrawerButton navigation={navigation} />
      )
      // headerRight: () => (
      // <DrawerButton navigation={this.props.navigation} />
      // ),
    }),
  }
);
export default LeftDrawerNavigator = createDrawerNavigator(
  {
    HeaderToggle: { screen: headerToggleStack },
    // place the rest of the stacks here!
  },
  {
    drawerPosition: "left",
    initialRouteName: "HeaderToggle",
    drawerBackgroundColor: Colors.headerGreen,
    drawerWidth: 300,
    contentComponent: CustomDrawerContentComponent,
  }
);
// const authNavigator = createStackNavigator(
//  { 
//    Login: {
//     screen: LoginScreen,
//   },
//   SignUp: {
//     screen: SignUpScreen,
//   },
//   ForgotPassword: {
//     screen: ForgotPasswordScreen,
//   },
// }
// )
// export default RootStack = createSwitchNavigator(
//   {
//     AuthLoading: {
//       screen: AuthLoadingScreen,
//     },
//     Auth: {
//       screen: authNavigator,
//     },
//     Main: {
//       screen: LeftDrawerNavigator,
//     },
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// )

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightRounded: {
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
  },
  leftRounded: {
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
  },
  inactiveCenterHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    padding: 8,
    color: Colors.darkGray,
    borderColor: Colors.headerGreen,
    borderWidth: 2,
    fontSize: 15,
  },
  activeCenterHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.headerGreen,
    padding: 8,
    color: Colors.white,
    borderColor: Colors.lightGreen,
    borderWidth: 2,
    fontSize: 15,
  },
  leftHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    padding: 8,
    color: Colors.darkGray,
  },
});