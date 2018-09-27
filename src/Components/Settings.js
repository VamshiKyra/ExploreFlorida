import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "react-native-firebase";
import Icon from "react-native-vector-icons/Ionicons";
class Settings extends Component {
  static navigationOptions = {
    title: "Settings",
    tabBarIcon: <Icon name="ios-settings" size={25} color="#000" />
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
        {/* <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Explore")}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        /> */}
        <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

export default Settings;
