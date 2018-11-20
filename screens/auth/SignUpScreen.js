import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";

export default class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onSignUpPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate("Login");
    };

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.title}>Sign Up</Text>

                <TextInput style={styles.inputField}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput style={styles.inputField}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({password: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput style={styles.inputField}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({passwordConfirm: text}) }}
                    placeholder="Password (confirm)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Button 
                    title="Signup" 
                    onPress={this.onSignUpPress} 
                    buttonStyle={styles.submitButton}
                />

                <Button 
                    title="Back to Login" 
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
    }
});