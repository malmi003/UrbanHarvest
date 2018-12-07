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
const { width, height } = Dimensions.get('window');

import GeoFire from 'geofire';
const geoFire = new GeoFire(db.ref("/geoFire/"));
const geoRef = geoFire.ref();
// set the geoQuery confines

class MapScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 45.986656,
        longitude: -93.258133,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      markerKeyArray: [],
      markerArray: [],
      modalVisible: false,
      contactId: "",
      contactInfo: "",
      contactFoodName: "",
      contactDisabled: true,
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
        let lat = parseFloat(item.val().lat);
        let lng = parseFloat(item.val().lng);
        let name = item.val().name;
        let description = item.val().description;
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
  pullRelevantFoods = (key, array) => {
    db.ref("currentFood/" + key).on("value", snapshot => {
      // grab the coords & hover data from each item in newFoods list
        let lat = parseFloat(snapshot.val().lat);
        let lng = parseFloat(snapshot.val().lng);
        let name = snapshot.val().name;
        let description = snapshot.val().description;
        let itemKey = snapshot.key;

        // push each one into the marker array
        array.push({
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
        markerArray: array,
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
    console.log("mounting state: ", this.state.region)
    this.getAndSetCurrentLocation();
    // this.pullFoods();
    // this.onEnter();
    // this.onExit();
  };

  geoQuery = () => geoFire.query({
    center: [this.state.region.latitude, this.state.region.longitude],
    // center: [45.986656, -93.258133],

    radius: 5
  });
  onExit = () => {
    let markerKeyArray = this.state.markerKeyArray;
    // console.log("GONE: ", markerKeyArray)
    this.geoQuery().on("key_exited", (key, location, distance) => {
      console.log("GONE: ", markerKeyArray)
      // console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");

      if (markerKeyArray.indexOf(key) !== -1) {
        markerKeyArray.splice(markerKeyArray.indexOf(key), 1);
      };
      this.setState({ markerKeyArray: markerKeyArray });

    });
  };
  onEnter = () => {
    let markerKeyArray = this.state.markerKeyArray;
    this.geoQuery().on("key_entered", (key, location, distance) => {
      // console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");

      if (markerKeyArray.indexOf(key) === -1) {
        markerKeyArray.push(key);
      };
      this.setState({ markerKeyArray: markerKeyArray });
      console.log("MARKERS: ", markerKeyArray)
    });
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
    // this.geoQuery().updateCriteria({
    //   center: [parseInt(this.state.region.latitude), parseInt(this.state.region.longitude)],
    // });
    // let markerKeyArray = this.state.markerKeyArray;
    // console.log("region", region)

    // this.geoQuery().on("key_exited", (key, location, distance) => {
    //   console.log("GONE: ", markerKeyArray)
    //   // console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");

    //   if (markerKeyArray.indexOf(key) !== -1) {
    //     markerKeyArray.splice(markerKeyArray.indexOf(key), 1);
    //   };
    //   this.setState({ markerKeyArray: markerKeyArray });

    // });
    // this.geoQuery().on("key_entered", (key, location, distance) => {
    //   // console.log(key + " is located at [" + location + "] which is within the query (" + distance.toFixed(2) + " km from center)");

    //   if (markerKeyArray.indexOf(key) === -1) {
    //     markerKeyArray.push(key);
    //   };
    //   this.setState({ markerKeyArray: markerKeyArray });
    //   console.log("MARKERS: ", markerKeyArray)
    // });
    let markerArray = [];
// so the issue here is it's being set to new coords centering on the map whenever the map moves which means keys go in but they never come out....
// render straight away and each time map moves - call onmount and reset on change...
// figure out how to set static initial center/radius and update based on when map moves then the keys should be able to come in and out....
    geoFire.query({
      center: [this.state.region.latitude, this.state.region.longitude],
      radius: 4
    }).on("key_entered", (key, location, distance) => {

      console.log("key: ", key)
      this.pullRelevantFoods(key, markerArray);

      // if (markerKeyArray.indexOf(key) === -1) {
      //   markerKeyArray.push(key);
      // };
      // this.setState({ markerKeyArray: markerKeyArray });
      // console.log("MARKERS: ", markerKeyArray)
    });

    // geoFire.query({
    //   center: [this.state.region.latitude, this.state.region.longitude],
    //   radius: 5
    // }).on("key_exited", (key, location, distance) => {
    //   console.log("GONE: ", markerArray)
    //   if (markerKeyArray.indexOf(key) !== -1) {
    //     markerKeyArray.splice(markerArray.indexOf(key), 1);
    //   };
    //   this.setState({ markerKeyArray: markerArray });

    // });


    // this.onEnter()
    // this.onExit();
  };

  setContactInformation = key => {
    db.ref("/currentFood/" + key).on("value", snapshot => {
      this.setState({
        contactId: key,
        contactInfo: snapshot.val().contact,
        contactFoodName: snapshot.val().name,
        contactDisabled: false,
      });
    });
  };
  emailProducer = (address, foodName) => {
    console.log(address, foodName)
    MailComposer.composeAsync({
      recipients: [address],
      subject: "Urban Harvest: " + [foodName],
      body: `Hello, \n\n I am interested the ${foodName} you posted on Urban Harvest. Where and when can I safely pick it up? \n\n Thank you!`
    })
      .then(status => {
        console.log(status)
      })
  };
  textProducer = (number, foodName) => {
    const isAvailable = SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      SMS.sendSMSAsync(number, "Hello, I am interested in the " + foodName + " you listed on Urban Harvest. Where and when can I safely pick it up? Thank you!")
    } else {
      // misfortune... there's no SMS available on this device
      Alert.alert("Unable to contact Producer without SMS available");
      console.log("no device detected");
    }
  };
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          // ref={(el) => (this.map = el)}
          style={{ flex: 1 }}
          // initialRegion={this.getAndSetCurrentLocation()}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          // showsMyLocationButton={true}
          loadingEnabled={true}
          provider={MapView.PROVIDER_GOOGLE}
          // reset the marker state on deselect
          onMarkerDeselect={() => {
            this.setState({
              contactId: "",
              contactInfo: "",
              contactFoodName: "",
              contactDisabled: true,
            });
          }}
        >
          {this.state.markerArray.map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require("../assets/images/broccoli.png")}
              key={marker.key}
              onPress={e => this.setContactInformation(e._targetInst.return.key)}
            >
              {/* <Callout>
                <Text style={{fontSize:20,}}>{marker.title}</Text>
                <Text>{marker.description}</Text>
                {/*  ** add image of food here */}
              {/* </Callout> */}
            </Marker>
          ))}
        </MapView>
        <View style={styles.mapButtonContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <ReportScreen
              contactKey={this.state.contactId}
            />
            {console.log("geofire marker array: ", this.state.markerKeyArray)}
            <MyButton
              onPress={() => this.pullFoods()}
              iconName={"refresh"}
              iconSize={30}
              iconStyle={styles.leftMapIcon}
              iconColor={Colors.headerGreen}
            />
          </View>
          {/* contact producer button */}
          <MyButton
            onPress={() => { this.emailProducer(this.state.contactInfo, this.state.contactFoodName) }}
            iconName={"contact"}
            iconSize={30}
            iconColor={Colors.white}
            buttonStyle={this.state.contactId ? styles.producerButtonActive : styles.producerButtonInActive}
            textStyle={styles.buttonText}
            title={" Contact Producer"}
            disabled={this.state.contactDisabled}
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
    width: 60,
    textAlign: "center"
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