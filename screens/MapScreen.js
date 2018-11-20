// ** need to add loading screen before finishes logging in

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { MapView } from 'expo';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";
import { pullFoods } from "../src/services/pullFoods";
import ProduceModalScreen from "./ProduceModalScreen";

const { Marker } = MapView;


class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 44.986656,
        longitude: -93.258133,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      },
      marker: {
        latlng: {
          latitude: 44.986656,
          longitude: -93.258133,
        },
        title: "myPin",
        description: "hadjcnaecnr"
      },
      modalVisible: false,
    };
  };
  
  _pullFoods = () => {
    pullFoods();
  };
  componentWillMount = () => {
    this._pullFoods();
  };
  _onRegionChange = region => {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <Marker
            coordinate={this.state.marker.latlng}
            title={this.state.marker.title}
            description={this.state.marker.description}
            image={require("../assets/images/broccoli.png")}
          />
        </MapView>

        <ProduceModalScreen />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },

});

export default withNavigation(MapScreen);