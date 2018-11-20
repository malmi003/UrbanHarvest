import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { FormInput, FormValidationMessage, FormLabel } from "react-native-elements";

class Input extends PureComponent {
    // state = {  };
    _handleChange = value => {
        this.props.onChange(this.props.name, value);
    }
    _handleTouch = () => {
        this.props.onTouch(this.props.name);
    }
    render() {
        const { label, error, placeholder, type, labelStyle, ...rest } = this.props;
        return (
            <View>
                <FormLabel
                labelStyle={labelStyle}
                >{label}</FormLabel>
                <FormInput
                    onChangeText={this._handleChange}
                    onBlur={this._handleTouch}
                    placeholder={placeholder}
                    type={type}
                    {...rest}
                />
                {error && <FormValidationMessage>{error}</FormValidationMessage>}
            </View>
        )
    }
};
export default Input;