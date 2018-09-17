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

const SettingsStack = createStackNavigator({
  Settings: { screen: Settings },
  Details: { screen: Details }
});
const MenuBarAndroid = createMaterialTopTabNavigator(
  {
    Explore: { screen: Explore },
    Settings: { screen: Settings }
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
    Explore: { screen: HomeStack },
    Settings: { screen: SettingsStack }
  },
  {
    initialRouteName: "Explore",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Settings") {
          iconName = `ios-options${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        //return
      }
    }),
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "gray"
    }
  }
);
class Navigation extends Component {
  renderMenu() {
    if (Platform.OS === "ios") {
      return <MenuBarIos />;
    } else {
      return <MenuBarAndroid />;
    }
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderMenu()}</View>;
  }
}

export default Navigation;
