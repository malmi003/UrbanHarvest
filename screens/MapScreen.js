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
import { MapView } from 'expo';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";

const { Marker } = MapView;


class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        latlng: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        title: "myPin",
        description: "hadjcnaecnr"
      }
    };
  };

  _onRegionChange = region => {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          // initialRegion={this.state.initialRegion}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <Marker
            coordinate={this.state.marker.latlng}
            title={this.state.marker.title}
            description={this.state.marker.description}
          />
        </MapView>

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
  };
};

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