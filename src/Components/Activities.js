import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
class Activities extends Component {
  state = {
    activities: []
  };
  static navigationOptions = {
    title: "Activities",
    tabBarIcon: <Icon name="md-walk" size={25} color="#000" />
  };
  render() {
    return <View />;
  }
}
// function Activities(props) {
//   return <Icon name="ios-person" size={30} color="#4F8EF7" />;
// }
export default Activities;
