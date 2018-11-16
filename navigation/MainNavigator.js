import React, { Component } from 'react';
import { Platform, Text, TouchableHighlight, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createTabNavigator } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';

import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import ProduceModalScreen from "../screens/ProduceModalScreen";
import { Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions } from 'react-navigation';


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
const navigateAction = NavigationActions.navigate({
  routeName: 'LeftDrawer',

  params: {},

  action: NavigationActions.navigate({ routeName: 'LeftDrawerNavigator' }),
});
class DrawerButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        // onPress={() => this.props.navigation.dispatch(navigateAction)}
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

const MainStack = createStackNavigator(
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
    // LeftDrawer: {
    //   screen: LeftDrawerNavigator
    // }
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
      headerRight: <DrawerButton navigation={navigation} />,
      headerLeft: () => (
        <DrawerButton navigation={navigation} />
      )
      // headerRight: () => (
      // <DrawerButton navigation={this.props.navigation} />
      // ),
    }),
  }
);
const LeftDrawerNavigator = createDrawerNavigator(
  {
    Main: { screen: MainStack },
    // Settings: { screen: SettingsScreen },

  },
  {
    drawerPosition: "left",
    initialRouteName: "Main",
    drawerBackgroundColor: "yellow",
    drawerWidth: 300,
  }
);

export default RootStack = createStackNavigator(
  {
    Main: {
      screen: LeftDrawerNavigator,
    },
    ProduceModal: {
      screen: ProduceModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)
//  RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: AnotherStack
//     },
//   }
// )


const styles = StyleSheet.create({
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