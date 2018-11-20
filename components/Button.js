import React, { PureComponent } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import Icon from "../components/Icon";

class MyButton extends PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
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
                <Text style={this.props.textStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    };
};
export default MyButton;