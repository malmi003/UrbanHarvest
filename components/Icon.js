import React from 'react';
import { Icon } from 'expo';
import {withNavigation} from "react-navigation";

import Colors from '../constants/Colors';

export default class icon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={this.props.size ? this.props.size : 26}
        style={this.props.style}
        // color={this.props.focused ? Colors.iconSelected : Colors.iconDefault}
        color={this.props.color}
        onPress={this.props.onPress}
        // navigation={this.props.navigation}
      />
    );
  };
};

// export default withNavigation(icon)

