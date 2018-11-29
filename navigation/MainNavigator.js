import React, { Component } from 'react';
import { Platform, Text, ScrollView, View, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';
import UserSettingsScreen from "../screens/mainMenu/userSettings";
import * as firebase from 'firebase';
import ProduceModalScreen from "../screens/ProduceModalScreen";
import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import MyListScreen from "../screens/MyList";
import GenericReportScreen from "../screens/mainMenu/GenericReportScreen";


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
        onPress={() => { this.props.navigation.openDrawer() }}
      >
        <Icon
          name={
            Platform.OS === 'ios'
              ? 'ios-menu'
              : 'md-menu'
          }
          size={35}
          style={{ paddingLeft: 25 }}
          color={Colors.white}
        />
      </TouchableOpacity >
    )
  };
};

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
      <View style={{ alignItems: "center" }}>
        <LogoTitle />
      </View>
      <DrawerItems {...props} />
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
        marginBottom: 0,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <DrawerButton navigation={navigation} />
      ),
      headerRight: <MyListScreen />,
    }),
  }
);
export default LeftDrawerNavigator = createDrawerNavigator(
  {
    "Find Food": { screen: headerToggleStack },
    "Settings": { screen: UserSettingsScreen },
    "Contact Customer Service": { screen: GenericReportScreen },
  },
  {
    drawerPosition: "left",
    initialRouteName: "Find Food",
    drawerBackgroundColor: Colors.headerGreen,
    drawerWidth: 300,
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      labelStyle: {
        color: Colors.white,
      },
      activeTintColor: Colors.tintColor,
      activeBackgroundColor: "none",
    },
  }
);

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
    color: Colors.darkerHeaderGreen,
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