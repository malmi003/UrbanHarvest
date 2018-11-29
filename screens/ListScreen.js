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


export default class ListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listArray: [],
    };
  }
  pullFoods = () => {
    db.ref("currentFood").on("value", snapshot => {
      // grab the coords & hover data from each item in newFoods list
      let listArray = [];
      snapshot.forEach(item => {
        let lat = parseFloat(item.val().lat);
        let lng = parseFloat(item.val().lng);
        let name = item.val().name;
        let description = item.val().description;
        let itemKey = item.key;
        let contact = item.val().contact;

        // push each one into the marker array
        listArray.push({
          latlng: {
            latitude: lat,
            longitude: lng
          },
          title: name,
          description: description,
          key: itemKey,
          contact: contact,
        })
      });
      this.setState({
        listArray: listArray,
      });
    });
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
  componentWillMount = () => {
    this.pullFoods();
    // this.getAndSetCurrentLocation();
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View style={styles.headerContainer}>
          <Text style={[Styles.title, { color: Colors.blue }]}>Food Postings Near You</Text>
        </View>
        <FlatList
          data={this.state.listArray}
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
                onPress={() => this.textProducer(item.contact, item.title)}
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