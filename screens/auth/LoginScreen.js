import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import * as Yup from 'yup';
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import { Button } from "react-native-elements";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    };
    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    };
    onCreateAccountPress = () => {
        this.props.navigation.navigate("SignUp");
    };
    onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput 
                    style={styles.inputField}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput 
                    style={styles.inputField}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    title="Login"
                    buttonStyle={styles.submitButton}
                    onPress={this.onLoginPress}
                />
                <Button
                    title="Create account..."
                    onPress={this.onCreateAccountPress}
                    buttonStyle={styles.plainButton}
                />
                <Button
                    title="Forgot Password..."
                    onPress={this.onForgotPasswordPress}
                    buttonStyle={styles.plainButton}
                />
            </View>
        );
    };
};

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