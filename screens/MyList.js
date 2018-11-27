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
// import { GOOGLE_API_KEY } from 'react-native-dotenv';
import Styles from "../constants/Styles";
import { db, } from "../src/config/db";
import Icon from "../components/Icon";
import MyButton from "../components/Button";
import ProduceModalScreen from "../screens/ProduceModalScreen";

// let userId = firebase.auth().currentUser.uid;

class MyListScreen extends React.Component {
    state = {
        modalVisible: false,
        myFoodsArray: [],
        focusFood: "",
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    };
    getUserFoods = () => {
        db.ref("/users/" + firebase.auth().currentUser.uid + "/currentFood").on("value", snapshot => {
            let myFoodsArray = [];
            console.log(snapshot.val())
            snapshot.forEach(item => {
                myFoodsArray.push(item.val());
            });
            this.setState({
                myFoodsArray: myFoodsArray,
            });
        });
    };
    handleDelete = key => {
        console.log(key)
        // first go get that item from the DB
        db.ref("/currentFood/" + key).once("value")
            .then(snapshot => {
                let deletedItem = snapshot.val();
                // and add it to the harvested foods list ( ** need to separate out functions of simply remove and harvest)
                console.log("deleted item: ", deletedItem)
                // add it to their harvestedFoods
                db.ref().child("/users/" + firebase.auth().currentUser.uid + "/harvestedFood/" + key).push(deletedItem)
                // remove from the current food list
                db.ref("/currentFood/" + key).remove();
                // remove it from their current food list
                db.ref("/users/" + firebase.auth().currentUser.uid + "/currentFood/" + key).remove();
            });

        // 
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
                            <ProduceModalScreen />
                            {/* if statement that either displays your foods from the DB or "none" message */}
                            {!this.state.myFoodsArray.length 
                                ? <Text style={[styles.listItemTitle, {margin:10, marginBottom:30, marginTop:25}]}>You don't have any foods to display at this time. Click "Add New Food" to start adding to the map.</Text> 
                                : <FlatList
                                    data={this.state.myFoodsArray}
                                    renderItem={({ item }) =>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: 'space-between',
                                            borderBottomWidth: 1,
                                            borderTopWidth: 1
                                        }}
                                        >
                                            <View>
                                                <Text style={styles.listItemTitle}>{item.name}</Text>
                                                <Text style={styles.listItemDesc}>{item.description}</Text>
                                            </View>
                                            <View>
                                                <Button
                                                    onPress={() => console.log("update")}
                                                    title="update"
                                                    backgroundColor={Colors.warningBackground}
                                                    color={Colors.darkGray}
                                                    fontSize={15}
                                                    rounded={true}
                                                    buttonStyle={{ marginBottom: 2 }}
                                                    containerViewStyle={{ marginTop: 8 }}
                                                    key="this is the id"
                                                />
                                                <Button
                                                    onPress={() => this.handleDelete(item.key)}
                                                    title="Harvest/Remove"
                                                    backgroundColor={Colors.errorBackground}
                                                    fontSize={15}
                                                    rounded={true}
                                                    containerViewStyle={{ marginBottom: 8 }}
                                                />
                                            </View>
                                        </View>}
                                    keyExtractor={item => item.name}
                                />
                            }
                        </View>

                        <Button
                            buttonStyle={[Styles.cancelButton, { marginBottom: 20, marginTop: 0 }]}
                            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                            onPress={() => { this.setModalVisible(false); }}
                            title="Close"
                        />
                    </ScrollView>
                </Modal>

                {/* My list Button that opens modal */}
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
        marginBottom: 30,
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
    listItemTitle: {
        fontSize: 20,
        paddingLeft: 10,
    },
    listItemDesc: {
        fontSize: 15,
        paddingLeft: 10,
    },

})

export default withNavigation(MyListScreen);
