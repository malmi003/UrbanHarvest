import React from 'react';
import { Platform, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';
import Colors from "../constants/Colors";
import Icon from "../components/Icon";
import ProduceModalScreen from "../screens/ProduceModalScreen";

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
    }
  },
  {
    initialRouteName: 'Map',
    navigationOptions: ({
      headerStyle: {
        backgroundColor: Colors.headerGreen,
      },
      headerTintColor: Colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: ({ focused }) => (
        // removed "focus" part of name statement - should add back in
        <Icon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? 'ios-menu'
              : 'md-menu'
          }
          size={40}
          style={{ paddingLeft: 20 }}
          color={Colors.white}
        />
      ),
      // headerRight goes here
    }),
  }
);

// modal
// class ProduceModalScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 30 }}>This is a modal!</Text>
//       <Button
//         onPress={() => this.props.navigation.goBack()}
//         title="Dismiss"
//       />
//     </View>
//     );
//   };
// };
// end modal

export default RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
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