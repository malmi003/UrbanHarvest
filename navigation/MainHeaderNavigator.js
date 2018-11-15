import React from 'react';
import { View, Button, Text, Image } from 'react-native';
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

class ToggleButton extends React.Component {
  render() {    
    return (
      <Button
        title={this.props.title}
        // onPress={() => {this.props.onPressDestination}}
        color="blue"
        onPress={()=>this.props.onPress1}
      />
    );
};
};

export default MainStack = createStackNavigator(
  {
  Map: {
    screen: () => <MapScreen />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Button
        title="Switch to List View"
        onPress={() => navigation.navigate("List")}
        color="blue"
      />
      ),
    })
  }, 
  List: {
    screen: () => <ListScreen />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Button
        title="Switch to Map View"
        onPress={() => navigation.navigate("Map")}
        color="blue"
      />
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
    <Button
      // onPress={() => navigation.navigate('MyModal')}
      onPress={()=> console.log("working")}
      title="Infio"
      color="#fff"
    />
      ),
    headerRight: (
      <Text>what</Text>
    ),
}),
}
);