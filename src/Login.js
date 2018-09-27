import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";
const { width, height } = Dimensions.get("window");

const background = require("./Img/login1_bg.png");
const mark = require("./Img/Kyra_logo.png");
const lockIcon = require("./Img/login1_lock.png");
const personIcon = require("./Img/login1_person.png");

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      Email: "",
      Password: "",
      error: "",
      loading: false
    };
  }
  authentication() {
    console.log("authentication");
    console.log(this.state.Email);
    console.log(this.state.Password);
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(
        this.state.Email,
        this.state.Password
      )
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailure.bind(this));
  }
  onLoginSuccess() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Navigation"
        })
      ]
    });
    console.log("success");
    if (firebase.auth()._user) {
      this.setState({
        Email: "",
        Password: "",
        loading: false,
        error: ""
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  onLoginFailure() {
    console.log("onloginfailure");
    this.setState({
      error: "Authentication failed: Invalid Email or Password",
      loading: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.markWrap}>
            <ImageBackground
              source={mark}
              style={styles.mark}
              resizeMode="contain"
            />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <ImageBackground
                  source={personIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                placeholder="Email or Username"
                placeholderTextColor="#FFF"
                style={[styles.input, styles.whiteFont]}
                onChangeText={Email => this.setState({ Email })}
                value={this.state.Email}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <ImageBackground
                  source={lockIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                placeholderTextColor="#FFF"
                placeholder="Password"
                style={[styles.input, styles.whiteFont]}
                onChangeText={Password => this.setState({ Password })}
                value={this.state.Password}
                secureTextEntry
              />
            </View>
            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={
                //this.props.navigation.navigate("Navigation");
                this.authentication.bind(this)
              }
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <View>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30
  },
  mark: {
    width: null,
    height: null,
    flex: 1
  },
  background: {
    width,
    height
  },
  wrapper: {
    paddingVertical: 30
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    height: 20,
    width: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: "#1B1B1B",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5
  },
  whiteFont: {
    color: "#FFF"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
});

export default Login;
