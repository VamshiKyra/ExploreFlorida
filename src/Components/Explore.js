import React, { Component } from "react";
import { View, Text, Button } from "react-native";
class Explore extends Component {
  static navigationOptions = {
    title: "Explore"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate("Details", {
              itemId: 86,
              otherParam: "First Details"
            })
          }
        />
      </View>
    );
  }
}
export default Explore;
