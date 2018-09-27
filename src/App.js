import React, { Component } from "react";
import Router from "./Router";
import { View, Platform, PermissionsAndroid } from "react-native";
// const config = {
//   client_id: "108934868810792360783",
//   appId: "1:842732630309:android:32709d51b8626bfb",
//   private_key_id: "a347060a83539f1602f5d429832e97ece48c140f",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8wZWq63gHHl5x\nbU3Rb1pcX3v87qXnh0pZzAonUp/P3B10KCc2C9UJOVH1ojfSUKRee9kWmlFDkssf\n2ZEwMwj6UaJ+Xln5DIOE/NRuzYn6zTXIn0bxxun+rKS259u0rbRN+LtyurHjwK/D\nyx5hu+M+BWHqudFilt55LJvgLn92IroswR9Z+iYfhCnF+1oHaLhJdorLAMgZxahZ\nlTeX4R/CNSvNfb0I2DpZ4QOsOuR9orqjryFEoh87VC4X95ZeSY7rIWgJGW3qLJXI\niL5xOIO4tw2gdazDCBoDgBBV6U7Sj9xAAUg8UQLEOxn2WJT7GdCDieM/Fu781OIZ\nKCISBr63AgMBAAECggEAKhlfIUz9a1EJrXC8j36vf7TIOaScmiQhoB+TECwserbU\nVujxvesrq6/+KLPykVTtJCmpRJJMl66w4TysVjy7vuDgRiETHin9V3bwhnoPUUHd\nwg5MS3abD/M/lY/m/8hSU6WrYS5kqLB8Q0YVU6UNTPL0YN7q5XtSyWH6riiQwy8f\nakD4M2QN23mdcJyqjgNsIxNbZ5ynaRV75SGmL3pso93tG6cLRHsA/RR/qe6T5Mod\nVuzZ9uH58e8o7+Nf9AH3C6TkuxwGSimYgjoh2eH0QNxhQjvo2lJKZ06h9/eEoOUp\nYQazC97gnuGplPY7bIf+airRc8Qe7NH9cD6Udja+kQKBgQDp3d4Xf1VvHj0i404t\nVfbvAnmX3n7J0/E47d5sETCcMtkz8QpVTcJXDZ2VxPwfvshsuTGuxw3R0Lp5ogp1\nZhEH3dKuPTJDPhZXiguZ7IYS3rqWgWkkcilDxPdNwF+/x1rxQYunA5sQCTeLAija\nZrlr0wE+3gIlAES8bJ0+OtV/uQKBgQDOnsc+6UxM8wfJLh/RPc0H4W8hfmWsRwpF\n7+ql4voR7M2iMNRza740j4sHyjzuwTwHhvAcw8+W/mFmb4LAnoQrQE8WRQP8zNb9\nJfDR/ii1obP9q2JvuO9tZVgjBb11mz6Ltx/LCN09m0GekLYEr1KyzG3jOekCgTtk\noddcUm8J7wKBgQDStRKP6yrnZcBBebkLAcPtDjbNjSqA35Mb7r0Sct5wLSQjN05P\nEzNAycSslwFt/K+JvcW0qiWaX8xTIJr5sU8w3jwevoZVrU/l6TuQoFkgEUrdpZU8\nwBrLs1/5zpS2LoCSk7KmdIo2BYfkl7qFJD51lnQt10rpWXeUqOt3kPyhCQKBgQCM\nYAlD76KcAN1ATCrnsJIUkY879TDEW7taCoajz1JQTU7jq0Mba47dDMzLLRY6q2PK\nRV3qXQozLn4j5wyxKsDm1Zklqxvra4uAj39OW9tykvrDE+Ybu0xHSXwYxzSRqzhS\nGcbq3Qnaahmpze0rv6VyvjrGDrkEr6IXW3ECUysHVwKBgDMDQj58H2JyEbGMrTnK\nNvEF4dRF6HjdHZHFHTJvGqn5rtkWoqXBkuL6djNZs3CBgV1ri9rbxeGCJWAd2jUu\nkBVYFkr9Qes2w/AH3tzRsAR5amGOcV3XzrfVqAplKSM0paItGdttMDrMPMgnya7Z\no4KWixDx71aK8ha3i4rUdU70\n-----END PRIVATE KEY-----\n",
//   client_email:
//     "firebase-adminsdk-5go13@exploreflorida-216721.iam.gserviceaccount.com",
//   apiKey: "AIzaSyBE4HmrPkKcvWDa-lFEgktdYuCNFQ1ipsY",
//   authDomain: "exploreflorida-216721.firebaseapp.com",
//   databaseURL: "https://exploreflorida-216721.firebaseio.com",
//   projectId: "exploreflorida-216721",
//   storageBucket: "exploreflorida-216721.appspot.com",
//   messagingSenderId: "842732630309"
// };
class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
  componentDidMount() {
    // firebase
    //   .auth()
    //   .signInAnonymouslyAndRetrieveData()
    //   .then(() => {
    //     this.setState({
    //       isAuthenticated: true
    //     });
    //   });
    async function requestPermissions() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location services");
        } else {
          console.log("permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
    if (Platform.OS === "ios") {
      navigator.geolocation.requestAuthorization();
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  }
  render() {
    // if (!this.state.isAuthenticated) {
    //   return null;
    // }
    //const initializeConfig = firebase.initializeApp(config, "ExploreFlorida");
    // firebase
    //   .app()
    //   .auth()
    //   .signInAnonymouslyAndRetrieveData()
    //   .then(user => {
    //     console.log("ExploreFlorida user ->", user.toJSON());
    //   });

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 20 : 0 }}>
        <Router />
      </View>
    );
  }
}
export default App;
