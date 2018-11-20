import React, { Component } from 'react';

import { Platform, Text, ScrollView, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Text style={{ paddingTop: 20 }}>Sign Up</Text >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
      },
});