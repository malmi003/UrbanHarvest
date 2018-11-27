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

  presentContactInformation = () => {
    // need to set the contactId state to the id for the clicked on marker (need to be able to toggle on and off)
    // then query the DB with that ID to bring back entire food object, set the contact information 
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {this.state.markerArray.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require("../assets/images/broccoli.png")}
              key={marker.key}
              onPress={e => console.log(e._targetInst.return.key)}
              // onPress={event => console.log(event._targetInst.return.key, event.nativeEvent)}
              // onCalloutPress={e => console.log("hello", e.nativeEvent)}
            />
          ))}
        </MapView>
        <View style={styles.mapButtonContainer}>
          <MyButton
            onPress={() => this.pullFoods()}
            iconName={"refresh"}
            iconSize={30}
            iconStyle={styles.leftMapIcon}
            iconColor={Colors.headerGreen}
          />
          {/* contact producer button */}
          <MyButton
            onPress={() => { this.getAndSetCurrentLocation() }}
            iconName={"contact"}
            iconSize={30}
            iconColor={Colors.white}
            buttonStyle={styles.producerButtonActive}
            textStyle={styles.buttonText}
            title={" Contact Producer"}
          />
          <MyButton
            onPress={() => { this.getAndSetCurrentLocation() }}
            iconName={"locate"}
            iconSize={30}
            iconStyle={styles.rightMapIcon}
            iconColor={Colors.headerGreen}
          />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: "transparent",
  },
  mapButtonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 0,
    padding: 8,
    alignItems: "flex-end",
    backgroundColor: Colors.lightGreen,
  },
  rightMapIcon: {
    // textShadowColor: 'rgba(0, 0, 0, 0.5)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 2
    
  },
  leftMapIcon: {
  },
  producerButtonActive: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor:Colors.headerGreen,
  },
  producerButtonInActive: {
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  inactive: {

  },
});

export default withNavigation(MapScreen);