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
  Dimensions,
} from 'react-native';
import { MapView } from 'expo';
import Colors from "../constants/Colors";
import { db } from "../src/config/db";
import { withNavigation } from "react-navigation";
import { pullFoods } from "../src/services/pullFoods";
import ProduceModalScreen from "./ProduceModalScreen";

const { Marker } = MapView;
const { width, height } = Dimensions.get('window');


class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 45.986656,
        longitude: -96.258133,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      },
      markerArray: [],
      modalVisible: false,
    };
  };
  // figure out the bounds of the screen (upper&lower lat& long)

  //map through the data to figure out if the given lat&lngs are within that range
  // pull all the pins from db, filter through them, create markers for each of those...
  pullFoods = () => {
    let markerArray = [];
    db.ref("currentFood").on("value", snapshot => {
      // grab the coords & hover data from each item in newFoods list
      snapshot.forEach(item => {
        let lat = parseFloat(item.val().newFood.lat);
        let lng = parseFloat(item.val().newFood.lng);
        let name = item.val().newFood.name;
        let description = item.val().newFood.description;
        let category = item.val().newFood.category;
        let contact = item.val().newFood.contact;
        let itemKey = item.key;

        // push each one into the marker array
        markerArray.push({
          latlng: {
            latitude: lat,
            longitude: lng
          },
          title: name,
          description: description,
          category: category,
          contact: contact,
          key: itemKey,
        })
      });
      // update the state to match the current markerArray
      this.setState({
        markerArray: markerArray,
      });
    });
  };

  getAndSetCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const success = pos => {
      const crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      this.setState({
        region: {
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }
      })
    };
    const error = err => { if (err) console.log(err) };
    // pull current location from Google - asks user permission
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  componentWillMount = () => {
    this.pullFoods();
    this.getAndSetCurrentLocation();
  };
  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
        {this.state.markerArray.map(marker => (
                <Marker
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                  image={require("../assets/images/broccoli.png")}
                  key={marker.key}
                />
            ))}
        </MapView>
        <Button
          title="zero on current location"
          onPress={() => { this.getAndSetCurrentLocation() }}
        />
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