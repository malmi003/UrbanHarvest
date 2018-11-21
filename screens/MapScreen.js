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
import ProduceModalScreen from "./ProduceModalScreen";
import MyButton from "../components/Button";

const { Marker } = MapView;
const { width, height } = Dimensions.get('window');


class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 45.986656,
        longitude: -96.258133,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markerArray: [],
      modalVisible: false,
    };
  };
  // figure out the bounds of the screen (upper&lower lat& long)
  //map through the data to figure out if the given lat&lngs are within that range
  // pull all the pins from db, filter through them, create markers for each of those...
  pullFoods = () => {
    db.ref("currentFood").on("value", snapshot => {
      // grab the coords & hover data from each item in newFoods list
      let markerArray = [];
      snapshot.forEach(item => {
        let lat = parseFloat(item.val().newFood.lat);
        let lng = parseFloat(item.val().newFood.lng);
        let name = item.val().newFood.name;
        let description = item.val().newFood.description;
        let itemKey = item.key;

        // push each one into the marker array
        markerArray.push({
          latlng: {
            latitude: lat,
            longitude: lng
          },
          title: name,
          description: description,
          key: itemKey,
        })
      });
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
        },
      });
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
    console.log(this.state.region)
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
        <View style={styles.mapButtonContainer}>
          <MyButton
            onPress={() => this.pullFoods()}
            iconName={"refresh"}
            iconSize={30}
            // iconStyle={}
            iconColor={Colors.headerGreen}          // textStyle={}
          // title={"Press me"}
          />
          <MyButton
            onPress={() => { this.getAndSetCurrentLocation() }}
            iconName={"locate"}
            iconSize={30}
            iconStyle={styles.leftMapIcon}
            iconColor={Colors.headerGreen}
            // textStyle={{ backgroundColor: "green" }}
          />
        </View>
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
  mapButtonContainer: {
    position: "absolute",
    bottom:100,
    paddingLeft: 20,
  }

});

export default withNavigation(MapScreen);