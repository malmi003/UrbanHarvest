import React from 'react';
import { ScrollView, Platform, StyleSheet, Text, View, TextInput, Linking, Alert, FlatList, } from 'react-native';
import { Button } from "react-native-elements";
import { ExpoLinksView } from '@expo/samples';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";
import * as firebase from 'firebase';
import { db } from "../src/config/db";
import Icon from "../components/Icon";
import Styles from "../constants/Styles";
import { MapView, SMS, MailComposer } from 'expo';

import GeoFire from 'geofire';
const geoFire = new GeoFire(db.ref("/geoFire/"));

export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listArray: [],
      region: {
        latitude: 45.986656,
        longitude: -93.258133,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    };
  }

  getAndSetCurrentLocation = () => {
    const options = {
      enableHighAccuracy: false,
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
  callGeoFire = () => {
    let listArray = [];
    geoFire.query({
      center: [this.state.region.latitude, this.state.region.longitude],
      radius: 10
    }).on("key_entered", (key, location, distance) => {
      // then it will run pull relevant foods for each one (this gets run each time a matching key is found in DB)
      db.ref("currentFood/" + key).on("value", snapshot => {
        // grab the coords & hover data from each item in newFoods list and push each one into the marker array
        console.log("snapshot", snapshot)
        listArray.push({
          latlng: {
            latitude: parseFloat(snapshot.val().lat),
            longitude: parseFloat(snapshot.val().lng)
          },
          title: snapshot.val().name,
          description: snapshot.val().description,
          key: snapshot.key,
          contactInfo: snapshot.val().email,
        })
      });
      this.setState({
        listArray: listArray,
      });
    });
    listArray = [];
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
  componentWillMount = () => {
    this.getAndSetCurrentLocation();
    this.callGeoFire();
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View style={styles.headerContainer}>
          <Text style={[Styles.title, { color: Colors.blue }]}>Food Postings Near You</Text>
        </View>
        <FlatList
          data={this.state.listArray}
          ListEmptyComponent={<Text>There are no items in your area at this time.</Text>}
          renderItem={({ item }) =>
            <View style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: Colors.lightGray,
              marginTop: 10,
              paddingBottom: 10,
            }}>
              <View style={{ overflowWrap: "break-word", flex: 3, }}>
                <Text style={styles.listItemTitle}>{item.title}</Text>
                <Text style={styles.listItemDesc}>{item.description}</Text>
              </View>
              <Button
                onPress={() => this.emailProducer(item.email, item.title)}
                title="Contact Producer"
                icon={{ name: 'ios-contact', type: "ionicon", size: 30, }}
                backgroundColor={Colors.headerGreen}
                fontSize={15}
                rounded={true}
                buttonStyle={{ marginBottom: 3 }}
                containerViewStyle={{ marginTop: 8, marginLeft: 1, flex: 2, }}
                raised={true}
              />
            </View>
          }
        >
          {console.log("Listview State: ", this.state)}
        </FlatList>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
  },
  listItemTitle: {
    fontSize: 20,
    paddingLeft: 20,
  },
  listItemDesc: {
    fontSize: 15,
    paddingLeft: 25,
    marginBottom: 20,

  },
});