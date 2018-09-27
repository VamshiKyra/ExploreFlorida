import React, { Component } from "react";
import { View, Platform } from "react-native";

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
// const MenuBarAndroid = createMaterialTopTabNavigator(
//   {
//     Explore: { screen: Explore },
//     Activities: { screen: Activities },
//     Favorties: { screen: Favorties },
//     Settings: { screen: Settings },
//     Info: { screen: Info }
//   },
//   {
//     initialRouteName: "Explore",
//     navigationOptions: {
//       tabBarColor: "white"
//     },
//     tabBarPosition: "top",
//     tabBarOptions: {
//       activeTintColor: "#000",
//       upperCaseLabel: false,
//       showIcon: true,
//       inactiveTintColor: "gray",
//       labelStyle: {
//         fontSize: 9
//       },
//       tabStyle: {
//         height: 60
//       },
//       style: {
//         backgroundColor: "#fff"
//       },
//       indicatorStyle: {
//         backgroundColor: "#000"
//       }
//     }
//   }
// );
const MenuBarIos = createBottomTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {
        headerTitle: "Explore"
      }
    },
    Activities: {
      screen: Activities,
      navigationOptions: {
        headerTitle: "Activities"
      }
    },
    Favorties: {
      screen: Favorties,
      navigationOptions: {
        headerTitle: "Favorties"
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerTitle: "Settings"
      }
    },
    Info: {
      screen: Info,
      navigationOptions: {
        headerTitle: "Info"
      }
    }
  },
  {
    initialRouteName: "Explore",
    navigationOptions: {
      tabBarColor: "white"
    },
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: "#000",
      upperCaseLabel: false,
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
// const SettingsStackAndroid = createStackNavigator(
//   {
//     Menu: {
//       screen: MenuBarAndroid,
//       navigationOptions: {
//         headerTitle: "Explore Florida"
//       }
//     },
//     Details: {
//       screen: Details,
//       navigationOptions: {
//         headerTitle: "Details"
//       }
//     }
//   },
//   {
//     navigationOptions: {
//       style: {
//         textAlign: "center",
//         alignSelf: "center"
//       },

//       headerTitleStyle: {
//         color: "white",
//         textAlign: "center",
//         justifyContent: "center",
//         alignSelf: "center"
//       },
//       headerStyle: {
//         height: 40,
//         textAlign: "justify",
//         backgroundColor: "#32363A",
//         alignContent: "center"
//       }
//     }
//   }
// );
const SettingsStackIos = createStackNavigator(
  {
    Menu: {
      screen: MenuBarIos
    },
    Details: {
      screen: Details,
      navigationOptions: {
        headerTitle: "Details"
      }
    }
  },
  {
    navigationOptions: {
      header: null
      // headerTitleStyle: {
      //   color: "white",
      //   fontSize: 20,
      //   textAlign: "justify",
      //   justifyContent: "space-between",
      //   alignContent: "center",
      //   paddingLeft: 0,
      //   alignSelf: "center"
      // },
      // headerStyle: {
      //   height: 0,
      //   backgroundColor: "#32363A",
      //   alignContent: "center"
      // }
    }
  }
);
// const LoginStackAndroid = createStackNavigator(
//   {
//     Login: { screen: Login },
//     SignUp: { screen: SignUp },
//     Navigation: { screen: SettingsStackAndroid }
//   },
//   {
//     navigationOptions: {
//       header: null,
//       headerLeft: null
//     }
//   }
// );
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
class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMenu() {
    return <LoginStackIos />;
  }
  render() {
    return <View style={{ flex: 1 }}>{this.renderMenu()}</View>;
  }
}
export default Router;
