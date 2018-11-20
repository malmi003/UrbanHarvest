import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import Styles from "../../constants/Styles";

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

                <TextInput style={Styles.inputField}
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
                    buttonStyle={Styles.submitButton}
                />
                <Button 
                    title="Back to Login..." 
                    onPress={this.onBackToLoginPress} 
                    buttonStyle={Styles.plainButton}
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
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 30,
        color: Colors.headerGreen,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});