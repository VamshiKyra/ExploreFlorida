import React, { Component } from "react";
import { Button, Text, View, Image, Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  TabBarBottom
} from "react-navigation";
import Explore from "./Explore";
import Details from "./Details";
import Settings from "./Settings";
import Activities from "./Activities";
import Info from "./Info";
import Favorties from "./Favorities";
const HomeStack = createStackNavigator(
  {
    Explore: { screen: Explore },
    Details: { screen: Details }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const MenuBarAndroid = createMaterialTopTabNavigator(
  {
    Explore: { screen: Explore },
    Activities: { screen: Activities },
    Favorties: { screen: Favorties },
    Settings: { screen: Settings },
    Info: { screen: Info }
  },
  {
    initialRouteName: "Explore",
    navigationOptions: {
      tabBarColor: "white"
    },
    tabBarPosition: "top",

    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        backgroundColor: "#000"
      }
    }
  }
);

const MenuBarIos = createBottomTabNavigator(
  {
    Explore: { screen: Explore },
    Activities: { screen: Activities },
    Favorties: { screen: Favorties },
    Settings: { screen: Settings },
    Info: { screen: Info }
  },
  {
    initialRouteName: "Explore",
    navigationOptions: {
      tabBarColor: "white"
    },
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        backgroundColor: "#000"
      }
    }
  }
);
const SettingsStackAndroid = createStackNavigator({
  Explore: { screen: MenuBarAndroid },
  Details: { screen: Details }
});
const SettingsStackIos = createStackNavigator({
  Explore: { screen: MenuBarIos },
  Details: { screen: Details }
});
class Navigation extends Component {
  renderMenu() {
    if (Platform.OS === "ios") {
      return <SettingsStackIos />;
    } else {
      return <SettingsStackAndroid />;
    }
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderMenu()}</View>;
  }
}

export default Navigation;
