import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {StackNavigator, createStackNavigator} from "react-navigation";
import Colors from "../constants/Colors";



export default class FooterScreen extends React.Component {
    // static navigationOptions = ({ navigation }) => {  
    //   return {
    //     Title: "hello",
    //   };
    // };
  
    // render() {
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <Text>Home Screen</Text>
    //       <Button
    //         title="Go to Details"
    //         onPress={() => {
    //           this.props.navigation.navigate('ProduceModal');
    //         }}
    //       />
    //     </View>
    //   );
    // }
    
    _consoleLog = () => {
        // console.info(this.props)
        console.log(this.props, "working")
    }  

    render () {   
    return (
            <View style={styles.tabBarInfoContainer}>
            <TouchableOpacity>
              <Text 
                style={styles.tabBarInfoText}
                onPress={() => this.props.navigation.navigate("ProduceModal")}
                // onPress={()=>{console.info(this.props)}}
                >Produce Foods
              </Text>
              </TouchableOpacity>
            </View>
    )
    }
  };

  const styles = StyleSheet.create({
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