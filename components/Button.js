import React, { PureComponent } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";

class MyButton extends PureComponent {
    render() {
        return (
            // <View style={this.props.buttonStyle}>
            <TouchableOpacity
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            >
                <View style={this.props.buttonStyle}>
                    <Icon
                        name={
                            Platform.OS === 'ios'
                                ? (`ios-${this.props.iconName}`)
                                : (`md-${this.props.iconName}`)
                        }
                        size={this.props.iconSize}
                        style={this.props.iconStyle}
                        color={this.props.iconColor}
                    />
                    <Text style={this.props.textStyle}>
                        {this.props.title}</Text>
                </View>
            </TouchableOpacity>
            // </View>
        )
    };
};
export default MyButton;