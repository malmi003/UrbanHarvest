import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Linking, Alert, Platform } from 'react-native';
import { Button } from "react-native-elements";
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from "react-navigation";
import * as firebase from 'firebase';
import Icon from "../../components/Icon";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";



export default class UserSettings extends React.Component {

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name="ios-settings" color={tintColor}/>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newEmail: "",
        };
    }

    // Occurs when signOut is pressed...
    onSignOutPress = () => {
        firebase.auth().signOut();
    }

    // Reauthenticates the current user and returns a promise...

    reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateAndRetrieveDataWithCredential(credential)
    }

    // Changes user's password...
    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
    }

    // Changes user's email...
    onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                Alert.alert("Email was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => {
            if (error.message === "The password is invalid or the user does not have a password.") {
                Alert.alert("Invalid password");
            }
            console.log(error.message, "here")
        });
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10, }}>
                <ScrollView>
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? (`ios-close`)
                                : (`md-close`)
                        }
                        onPress={() => this.props.navigation.goBack()}
                        size={40}
                    />
                    <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Enter current password to change password or email.</Text>

                    <TextInput style={styles.darkTextInput} value={this.state.currentPassword}
                        placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ currentPassword: text }) }}
                    />

                    <TextInput style={styles.textInput} value={this.state.newPassword}
                        placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                        onChangeText={(text) => { this.setState({ newPassword: text }) }}
                    />
                    <Button
                        title="Change Password"
                        onPress={this.onChangePasswordPress}
                        buttonStyle={[Styles.plainButton, { marginTop: 0,}]}
                        containerViewStyle={{
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                    />
                    <TextInput style={styles.textInput} value={this.state.newEmail}
                        placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
                        onChangeText={(text) => { this.setState({ newEmail: text }) }}
                    />
                    <Button
                        title="Change Email"
                        onPress={this.onChangeEmailPress}
                        buttonStyle={[Styles.plainButton, { marginTop: 0,}]}
                        containerViewStyle={{
                            marginLeft: 0,
                            marginRight: 0,
                        }}
                    />
                    <Button
                        buttonStyle={Styles.cancelButton}
                        title="Sign out"
                        onPress={this.onSignOutPress}
                        containerViewStyle={styles.bottomButton}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: 20,
        padding: 10,
        height: 40,
        alignSelf: "stretch",
        fontSize: 18,
        marginTop: 40,
        marginBottom: 40,
    },
    darkTextInput: {
        borderWidth: 1,
        borderColor: Colors.darkGray,
        // marginVertical: 20,
        padding: 10,
        height: 40,
        alignSelf: "stretch",
        fontSize: 18,
        marginTop: 40,
        marginBottom: 20,
    },
    bottomButton: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 40,
        //     position: "absolute",
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
    },
});


// export default withNavigation(ListScreen);
