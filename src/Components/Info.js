import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
class Info extends Component {
  state = {
    info: []
  };
  static navigationOptions = {
    title: "Info",
    tabBarIcon: <Icon name="info" size={25} color="#000" />
  };
  render() {
    return <View />;
  }
}

export default Info;
