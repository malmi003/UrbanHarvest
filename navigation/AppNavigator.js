import React from 'react';
import MainNavigator from "./MainNavigator";

// export default createSwitchNavigator(
//   {
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   // Main: MainTabNavigator,
//   Main: MainNavigator,
//   }
// );

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}