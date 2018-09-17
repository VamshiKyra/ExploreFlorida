import React, { Component } from "react";
import { Button, Text, View, Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
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
      headerTitle: (
        <Image
          source={require("./spiro.png")}
          style={{ width: 30, height: 30 }}
        />
      )
    }
  }
);

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
