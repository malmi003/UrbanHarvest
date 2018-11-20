import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import * as Yup from 'yup';
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import { Button } from "react-native-elements";
import Styles from "../../constants/Styles";

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
                <Text style={Styles.title}>Login</Text>

                <TextInput 
                    style={Styles.inputField}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput 
                    style={Styles.inputField}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    title="Login"
                    buttonStyle={Styles.submitButton}
                    onPress={this.onLoginPress}
                />
                <Button
                    title="Create account..."
                    onPress={this.onCreateAccountPress}
                    buttonStyle={Styles.plainButton}
                />
                <Button
                    title="Forgot Password..."
                    onPress={this.onForgotPasswordPress}
                    buttonStyle={Styles.plainButton}
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
        backgroundColor: Colors.white,
    },
});