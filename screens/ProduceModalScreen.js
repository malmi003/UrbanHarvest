import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { withNavigation } from "react-navigation";



class ProduceModalScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => {this.props.navigation.goBack()}}
          title="Dismiss"
        />
      </View>
      );
    };
  };

  export default withNavigation(ProduceModalScreen);
  