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
  Alert,
} from 'react-native';
import { MapView, SMS, MailComposer } from 'expo';
import Icon from "../components/Icon";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import { db } from "../src/config/db";
import { withNavigation } from "react-navigation";
import MyButton from "../components/Button";
import ReportScreen from "../screens/ReportScreen";
const { Marker, Callout, } = MapView;
import GeoFire from 'geofire';
const geoFire = new GeoFire(db.ref("/geoFire/"));

class MapScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <MyIcon name="ios-mail" color={tintColor} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 44.998,
        longitude: -93.263,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markerArray: [],
      modalVisible: false,
    };
  };
  callGeoFire = () => {
    let markerArray = [];
    geoFire.query({
      center: [this.state.region.latitude, this.state.region.longitude],
      radius: 4
    }).on("key_entered", (key, location, distance) => {
      // then it will run pull relevant foods for each one (this gets run each time a matching key is found in DB)
      db.ref("currentFood/" + key).on("value", snapshot => {
        // grab the coords & hover data from each item in newFoods list and push each one into the marker array
        // console.log("geo snapshot", snapshot)
        markerArray.push({
          latlng: {
            latitude: parseFloat(snapshot.val().lat),
            longitude: parseFloat(snapshot.val().lng)
          },
          title: snapshot.val().name,
          description: snapshot.val().description,
          key: snapshot.key,
          contactInfo: snapshot.val().contact,
        })
        this.setState({
          markerArray: markerArray,
        });
      })
    });
    markerArray = [];
  };
  getAndSetCurrentLocation = () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 3000,
      maximumAge: 0
    };
    const success = pos => {
      const crd = pos.coords;

      this.setState({
        region: {
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
      });
      // console.log("region", this.state.region)
      this.callGeoFire();
      // setTimeout(this.callGeoFire, 5000);
    };
    const error = err => { if (err) console.log(err) };
    // pull current location from Google - asks user permission
    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  componentDidMount = () => {
    //   // below will create a geoFire query to pull all the keys in the given region
    //   setTimeout(this.callGeoFire, 10000)
    this.getAndSetCurrentLocation();
    // this.callGeoFire();

    // this.forceUpdate();
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.region !== prevState.region) {
  //     this.callGeoFire();
  //     console.log("running")
  //   }
  // }

  //only updating region after the map scroll has been complete to avoid "glitchy" map 
  onRegionChangeComplete = region => {
    // update the region
    this.setState({ region });
    // below will create a geoFire query to pull all the keys in the given region
    this.callGeoFire();
  };

  emailProducer = (address, foodName) => {
    console.log(address, foodName)
    MailComposer.composeAsync({
      recipients: [address],
      subject: "Urban Harvest: " + [foodName],
      body: `Hello, \n\n I am interested in the ${foodName} you posted on Urban Harvest. Where and when can I safely pick it up? \n\n Thank you!`
    })
      .then(status => {
        console.log(status)
      })
  };
  // Currently this functionality is not being used
  // textProducer = (number, foodName) => {
  //   const isAvailable = SMS.isAvailableAsync();
  //   if (isAvailable) {
  //     // do your SMS stuff here
  //     SMS.sendSMSAsync(number, "Hello, I am interested in the " + foodName + " you listed on Urban Harvest. Where and when can I safely pick it up? Thank you!")
  //   } else {
  //     // misfortune... there's no SMS available on this device
  //     Alert.alert("Unable to contact Producer without SMS available");
  //     console.log("no device detected");
  //   }
  // };

  sendReport = (contactKey) => {
    MailComposer.composeAsync({
      recipients: ["info@urbanharvest.com"],
      subject: `Urban Harvest Report: ${contactKey}`,
      body: `Hello, \n\n I would like to report the following issue: \n\n  \n\n Thank you,`
    })
      .then(status => {
        console.log(status)
      })
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          // initialRegion={this.state.region}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          loadingIndicatorColor={Colors.headerGreen}
        // onMapReady={console.log("map is ready")}
        // provider={MapView.PROVIDER_GOOGLE}
        >
          {/* {console.log(this.state.markerArray)} */}
          {this.state.markerArray.map(marker => (
            <Marker
              coordinate={marker.latlng}
              // title={marker.title}
              // description={marker.description}
              image={require("../assets/images/broccoli.png")}
              key={marker.key}

            >
              <Callout>
                <Text style={{ fontSize: 20, textAlign: "center" }}>{marker.title}</Text>
                <Text style={{ textAlign: "center" }}>{marker.description}</Text>
                <MyButton
                  onPress={() => { this.emailProducer(marker.contactInfo, marker.title); console.log(marker) }}
                  iconName={"contact"}
                  iconSize={30}
                  iconColor={Colors.white}
                  buttonStyle={styles.producerButtonActive}
                  textStyle={styles.buttonText}
                  title={" Contact Producer"}
                />
                <MyButton
                  onPress={() => this.sendReport(marker.key)}
                  title="Report"
                  iconName={"alert"}
                  iconSize={30}
                  iconStyle={styles.leftMapIcon}
                  iconColor={Colors.headerGreen}
                  buttonStyle={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}
                />
              </Callout>
            </Marker>
          ))}
        </MapView>
        <View style={styles.mapButtonContainer}>
          {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}> */}

          <MyButton
            onPress={() => this.callGeoFire()}
            iconName={"refresh"}
            iconSize={30}
            iconStyle={styles.leftMapIcon}
            iconColor={Colors.headerGreen}
          />
          {/* </View> */}
          {/* contact producer button */}
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
    justifyContent: "space-between",
    marginTop: 0,
    padding: 8,
    alignItems: "center",
    backgroundColor: Colors.lightGreen,
  },
  rightMapIcon: {
    padding: 2,
  },
  leftMapIcon: {
    padding: 2,
  },
  producerButtonActive: {
    marginTop: 8,
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
    backgroundColor: Colors.headerGreen,
  },
  producerButtonInActive: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 8,
    backgroundColor: Colors.lightGreen,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },

});

export default withNavigation(MapScreen);