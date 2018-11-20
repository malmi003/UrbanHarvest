import React from 'react';
import { ScrollView, StyleSheet, Platform, TouchableOpacity, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from "../constants/Colors";
import { withNavigation } from "react-navigation";
import ProduceModalScreen from "./ProduceModalScreen";


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
        {/* <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity>
            <Text
              style={styles.tabBarInfoText}
              onPress={() => this.props.navigation.navigate("ProduceModal")}
            >Produce Food
        </Text>
          </TouchableOpacity>
        </View> */}
        <ProduceModalScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

export default withNavigation(ListScreen);