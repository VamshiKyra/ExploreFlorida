import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {}
    };
  }
  static navigationOptions = {
    title: "Details",
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: "normal",
      justifyContent: "center",
      alignSelf: "center",
      width: "35%"
    },
    backTitle: ""
  };
  componentDidMount() {
    console.log(this.props.navigation);
    if (this.props.navigation) {
      this.setState({ params: this.props.navigation.state.params });
    }
  }
  render() {
    const { title, description } = this.state.params;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>{this.props.title}</Text>
          <Text>{this.props.description}</Text>
        </View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {console.log(this.state.params)}
      </View>
    );
  }
}

export default Details;
