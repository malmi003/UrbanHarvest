import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from '../screens/HomeScreen';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/robot-dev.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
    
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: <LogoTitle />,
    headerLeft: (
      <Text>yo</Text>
        ),
      headerRight: (
        <Text>what</Text>
      ),
    },
  }
);
const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'card',
    headerMode: 'none',
  }
);
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}