import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapScreen from "../screens/MapScreen";
import ListScreen from '../screens/ListScreen';

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

export default MainStack = createStackNavigator(
  {
  Map: {
    screen: () => <MapScreen />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <TouchableOpacity>
           <Text
            style={styles.activeCenterHeaderButton}
            onPress={() => navigation.navigate("Map")}
          >Map View</Text>
          <Text
            style={styles.inactiveCenterHeaderButton}
            onPress={() => navigation.navigate("List")}
          >List View</Text>
        </TouchableOpacity>
      ),
    })
  }, 
  List: {
    screen: () => <ListScreen />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <TouchableOpacity>
          <Text
            style={styles.inactiveCenterHeaderButton}
            onPress={() => navigation.navigate("Map")}
          >Map View</Text>
          <Text
            style={styles.activeCenterHeaderButton}
            onPress={() => navigation.navigate("List")}
          >List View</Text>
        </TouchableOpacity>
      ),
    }),
  }
},
{
  initialRouteName: 'Map',
    
navigationOptions: ({ navigation }) => ({
  headerStyle: {
    backgroundColor: '#89b369',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerTitle: <LogoTitle />,
  
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
  activeCenterHeaderButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    color: "green",
  },
  inactiveCenterHeaderButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    color: "blue",
  },
  leftHeaderButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    color: "blue",
  },
});