import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";

const background = require("./Img/login1_bg.png");
const backIcon = require("./Img/back.png");
const personIcon = require("./Img/login1_person.png");
const lockIcon = require("./Img/login1_lock.png");
const emailIcon = require("./Img/signup_email.png");
const birthdayIcon = require("./Img/signup_birthday.png");

class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerIconView}>
              <TouchableOpacity
                style={styles.headerBackButtonView}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <ImageBackground
                  source={backIcon}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Name"
                placeholderTextColor="#FFF"
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground
                  source={emailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground
                  source={lockIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <ImageBackground
                  source={birthdayIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Birthday"
                placeholderTextColor="#FFF"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Join</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <View style={styles.signin}>
                <Text style={styles.greyFont}>
                  Already have an account?
                  <Text style={styles.whiteFont}> Sign In</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null
  },
  headerContainer: {},
  inputsContainer: {},
  footerContainer: {
    paddingTop: 30,
    paddingBottom: 50
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: "transparent"
  },
  headerBackButtonView: {
    width: 25,
    height: 25
  },
  backButtonIcon: {
    width: 20,
    height: 20
  },
  headerTitleView: {
    backgroundColor: "transparent",
    marginTop: 15,
    marginLeft: 25
  },
  titleViewText: {
    fontSize: 25,
    color: "#fff"
  },
  inputs: {
    paddingVertical: 20
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: "#CCC",
    borderColor: "transparent",
    flexDirection: "row",
    height: 75
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  inputIcon: {
    width: 25,
    height: 25
  },
  input: {
    flex: 1,
    fontSize: 15
  },
  signup: {
    backgroundColor: "#1B1B1B",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  signin: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  greyFont: {
    color: "#D8D8D8"
  },
  whiteFont: {
    color: "#FFF"
  }
});
export default SignUp;
