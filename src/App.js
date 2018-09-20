import React, { Component } from "react";
import { View, Platform } from "react-native";
import Header from "./Components/Header";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import Explore from "./Components/Explore";
import Details from "./Components/Details";
import Settings from "./Components/Settings";
import Activities from "./Components/Activities";
import Info from "./Components/Info";
import Favorties from "./Components/Favorities";
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
  Menu: { screen: MenuBarAndroid },
  Details: { screen: Details }
});
const SettingsStackIos = createStackNavigator({
  Menu: { screen: MenuBarIos },
  Details: { screen: Details }
});
const LoginStackAndroid = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Navigation: { screen: SettingsStackAndroid }
  },
  {
    navigationOptions: {
      header: null,
      headerLeft: null
    }
  }
);
const LoginStackIos = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Navigation: { screen: SettingsStackIos }
  },
  {
    navigationOptions: {
      header: null,
      headerLeft: null
    }
  }
);
class App extends Component {
  renderMenu() {
    if (Platform.OS === "ios") {
      return <LoginStackIos />;
    } else {
      return <LoginStackAndroid />;
    }
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderMenu()}</View>;
  }
}
export default App;
