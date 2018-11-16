import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";
import MapView from 'react-native-maps';


class MapScreen extends React.Component { 
  
  render() {
    let region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    return (
      <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
      />
        <View style={styles.tabBarInfoContainer}>
            <TouchableOpacity>
              <Text 
                style={styles.tabBarInfoText}
                onPress={() => this.props.navigation.navigate("ProduceModal")}
                >Produce Food
              </Text>
              </TouchableOpacity>
            </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: Colors.headerGreen,
    paddingTop: 8,
    paddingBottom: 20,
  },
  tabBarInfoText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: "bold",
    letterSpacing: 1.2,
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    borderColor: Colors.lightGreen,
  },
});

export default withNavigation(MapScreen);