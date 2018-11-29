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
const { Marker, Callout } = MapView;
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
    console.log("Mapview State: ", this.state)
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

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
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