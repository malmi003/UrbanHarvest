import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
        };
    };
    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    };
    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login");
    };

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.title}>Forgot Password</Text>

                <TextInput style={styles.inputField}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button 
                    title="Reset Password" 
                    onPress={this.onResetPasswordPress} 
                    buttonStyle={styles.submitButton}
                />
                <Button 
                    title="Back to Login..." 
                    onPress={this.onBackToLoginPress} 
                    buttonStyle={styles.plainButton}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    inputField: {
        fontSize: 20,
        borderBottomWidth:1,
        borderBottomColor: Colors.lightGray,
        width: 300,
        height: 40,
    },
    submitButton: {
        marginTop: 100,
        width: "100%",
        backgroundColor: Colors.headerGreen
    },
    plainButton: {
        backgroundColor: Colors.blue,
        width: "100%",
        marginTop: 10,
    },
    title: {
        fontSize: 30,
        color: Colors.headerGreen,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});