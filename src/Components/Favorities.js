import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
class Favorities extends Component {
  state = {
    favorities: []
  };
  static navigationOptions = {
    title: "Favorities",
    tabBarIcon: <Icon name="heart" size={25} color="#000" />
  };
  render() {
    return <View />;
  }
}

export default Favorities;
