import React from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    FlatList,
} from 'react-native';
import { withNavigation } from "react-navigation";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import { Button } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addFood } from "../src/services/addFood";
import * as firebase from "firebase";
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import Styles from "../constants/Styles";
import { db, } from "../src/config/db";
import Icon from "../components/Icon";

// let userId = firebase.auth().currentUser.uid;

class MyListScreen extends React.Component {
    state = {
        modalVisible: false,
        myFoodsArray: [],
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    };
    getUserFoods = () => {
        db.ref("/users/" + firebase.auth().currentUser.uid).on("value", snapshot => {
            console.log("SNAPSHOTS: ", snapshot.val(), "Second SNAPSHOTS: ", snapshot)
            let myFoodsArray = [];
            snapshot.forEach(item => {
                let name = item.val().currentFood.name;
                console.log(name);
                myFoodsArray.push(item.val().currentFood);
            });

            this.setState({
                myFoodsArray: myFoodsArray,
            })
        });
    };
    handleDelete = values => {

    };
    componentWillMount = () => {
        this.getUserFoods();
    };

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <ScrollView>
                        <View style={styles.headerContainer}>
                            <Icon
                                name={
                                    Platform.OS === 'ios'
                                        ? (`ios-close`)
                                        : (`md-close`)
                                }
                                onPress={() => { this.setModalVisible(false) }}
                                size={50}
                                style={{ paddingLeft: 20 }}
                            />
                            <Text style={[Styles.title]}>My List</Text>
                            {/* dummy component to center header elements correctly */}
                            <Text style={{ paddingRight: 30 }}></Text>
                        </View>
                        <View>

                            <FlatList
                                data={this.state.myFoodsArray}
                                renderItem={({ item }) =>
                                    <Text>{item.name}</Text>}
                                keyExtractor={item => item.name}
                            />
                            {console.log(this.state.myFoodsArray)
                                // (this.state.myFoodArray) ? console.log("c-logging", JSON.parse(JSON.stringify(this.state.myFoodsArray))) : console.log("nothing here")
                            }
                            {/* {
                                this.state.myFoodsArray.map(food => (
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
                                ))
                            } */}
                        </View>
                        <Button
                            buttonStyle={[Styles.cancelButton, { marginBottom: 20 }]}
                            onPress={() => { this.setModalVisible(false); }}
                            title="Close"
                        />
                    </ScrollView>
                </Modal>

                {/* Produce Food Button that opens modal */}
                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={styles.rightHeaderButton}>My List</Text>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
        marginTop: 40,
        // textAlign: "center",

    },
    rightHeaderButton: {
        alignItems: 'center',
        backgroundColor: Colors.headerGreen,
        color: Colors.white,
        fontSize: 20,
        // width: 80,
        // flexWrap: "wrap",
        // height: 44,
        textAlign: "center",
        transform: [{ skewX: '-10deg' }],
        marginRight: 5,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        paddingRight: 25,
    },
})

export default withNavigation(MyListScreen);
