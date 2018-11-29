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

        // push each one into the marker array
        listArray.push({
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
        listArray: listArray,
      });
    });
  };

  componentWillMount = () => {
    this.pullFoods();
    // this.getAndSetCurrentLocation();
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View style={styles.headerContainer}>
          <Text style={[Styles.title, {color: Colors.blue}]}>Food Postings Near You</Text>
        </View>
        <FlatList
          data={this.state.listArray}
          renderItem={({ item }) =>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: Colors.lightGray,
              marginTop: 10,
              paddingBottom: 10,
            }}>
              <View>
                <Text style={styles.listItemTitle}>{item.title}</Text>
                <Text style={styles.listItemDesc}>{item.description}</Text>
              </View>
              <Button
                onPress={() => console.log(contact)}
                title="Contact Producer"
                icon={{ name: 'ios-contact', type: "ionicon", size: 30, }}
                backgroundColor={Colors.headerGreen}
                fontSize={15}
                rounded={true}
                buttonStyle={{ marginBottom: 3, width: 200 }}
                containerViewStyle={{ marginTop: 8 }}
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
    paddingLeft: 40,
  },
  listItemDesc: {
    fontSize: 15,
    paddingLeft: 40,
    marginBottom: 20,

  },
});