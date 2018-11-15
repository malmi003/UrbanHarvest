import React from 'react';
import { Button, Text, Image } from 'react-native';
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
  }, 
  List: {
    screen: () => <ListScreen />
  }
},
{
  initialRouteName: 'Map',
    
navigationOptions: {
  headerStyle: {
    backgroundColor: '#89b369',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitle: <LogoTitle />,
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
  },
}
);