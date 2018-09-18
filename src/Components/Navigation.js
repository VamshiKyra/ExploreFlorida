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
const SettingsStack = createStackNavigator({
  Explore: { screen: MenuBarAndroid },
  Details: { screen: Details }
});
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
      return <SettingsStack />;
    }
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderMenu()}</View>;
  }
}

export default Navigation;
