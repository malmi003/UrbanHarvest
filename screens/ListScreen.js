import React from 'react';
import { ScrollView, StyleSheet, Platform, TouchableOpacity, Text, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";


class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'LinkScreen',
  };

  render() {
    return (
      <View style={styles.container}>

      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
      <TouchableOpacity>
        <Text 
          style={styles.tabBarInfoText}
          onPress={() => this.props.navigation.navigate("ProduceModal")}
          >Produce Foods
        </Text>
        </TouchableOpacity>
      </View>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: Colors.headerGreen,
    paddingTop: 8,
    paddingBottom: 20,
  },
  tabBarInfoText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: "bold",
    letterSpacing: 1.2,
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    borderColor: Colors.lightGreen,
  },
});

export default withNavigation(ListScreen);