import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Explore from "./Explore";
import Details from "./Details";
import Settings from "./Settings";
const HomeStack = createStackNavigator({
  Explore: { screen: Explore },
  Details: { screen: Details }
});

const SettingsStack = createStackNavigator({
  Settings: { screen: Settings },
  Details: { screen: Details }
});
const MenuBar = createBottomTabNavigator(
  {
    Explore: { screen: HomeStack },
    Settings: { screen: SettingsStack }
  },
  {
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
        //return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);
class Navigation extends Component {
  render() {
    return <MenuBar />;
  }
}

export default Navigation;
