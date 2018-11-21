import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, Platform } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from "../../constants/Colors";
import { withNavigation } from "react-navigation";
import * as firebase from 'firebase';
import Icon from "../../components/Icon";



export default class UserSettings extends React.Component {

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
        }).catch((error) => { console.log(error.message) });
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10, }}>
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? (`ios-close`)
                            : (`md-close`)
                    }
                    onPress={() => this.props.navigation.goBack()}
                    size={40}
                />

                <Button title="Sign out" onPress={this.onSignOutPress} />

                <TextInput style={styles.textInput} value={this.state.currentPassword}
                    placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
                    onChangeText={(text) => { this.setState({ currentPassword: text }) }}
                />

                <TextInput style={styles.textInput} value={this.state.newPassword}
                    placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                    onChangeText={(text) => { this.setState({ newPassword: text }) }}
                />

                <Button title="Change Password" onPress={this.onChangePasswordPress} />

                <TextInput style={styles.textInput} value={this.state.newEmail}
                    placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
                    onChangeText={(text) => { this.setState({ newEmail: text }) }}
                />

                <Button title="Change Email" onPress={this.onChangeEmailPress} />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
    textInput: { borderWidth: 1, borderColor: "gray", marginVertical: 20, padding: 10, height: 40, alignSelf: "stretch", fontSize: 18, },
});


// export default withNavigation(ListScreen);
