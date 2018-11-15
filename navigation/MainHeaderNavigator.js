import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';
import Colors from "../constants/Colors";

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
      <View style={{flex:1, flexDirection:"row", justifyContent:"center"}}>
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

export default MainStack = createStackNavigator(
  {
  Map: {
    screen: () => <MapScreen />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderViewToggleBtn 
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
    
navigationOptions: ({ navigation }) => ({
  headerStyle: {
    backgroundColor: Colors.headerGreen,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerLeft: (
    <TouchableOpacity>
      <Text
            style={styles.leftHeaderButton}
            onPress={() => alert("info!")}
          >Info
      </Text>
    </TouchableOpacity>
      ),
    headerRight: (
      <Text>what</Text>
    ),
}),
}
);

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
    borderColor:Colors.headerGreen,
    borderWidth: 2,
  },
  activeCenterHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 8,
    color: Colors.darkGray,
    // borderColor:Colors.darkerHeaderGreen,
    // borderWidth: 2,
  },
  leftHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.lightGreen,
    padding: 8,
    color: Colors.darkGray,
  },
});