import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import SearchIcon from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
class Favorities extends Component {
  state = {
    favorities: []
  };
  static navigationOptions = {
    title: "Favorities",
    tabBarIcon: <Icon name="heart" size={25} color="#000" />
  };
  render() {
    return (
      <View />
      // <GooglePlacesAutocomplete
      //   placeholder="Search"
      //   minLength={2} // minimum length of text to search
      //   autoFocus={false}
      //   returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      //   listViewDisplayed="auto" // true/false/undefined
      //   fetchDetails={true}
      //   renderDescription={row => row.description} // custom description render
      //   onPress={(data, details = null) => {
      //     // 'details' is provided when fetchDetails = true
      //     console.log(data, details);
      //   }}
      //   getDefaultValue={() => ""}
      //   query={{
      //     // available options: https://developers.google.com/places/web-service/autocomplete
      //     key: "AIzaSyDzICKl_pd87hJVESAiMImhgz08wnNlTxU",
      //     language: "en" // language of the results
      //     //types: '(cities)' // default: 'geocode'
      //   }}
      //   styles={{
      //     textInputContainer: {
      //       width: "100%"
      //     },
      //     description: {
      //       fontWeight: "bold"
      //     },
      //     predefinedPlacesDescription: {
      //       color: "#1faadb"
      //     },
      //     poweredContainer: {
      //       opacity: 0
      //     },
      //     renderRightButton: {
      //       padding: 10
      //     }
      //   }}
      //   currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //   currentLocationLabel="Current location"
      //   nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      //   GoogleReverseGeocodingQuery={
      //     {
      //       // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      //     }
      //   }
      //   GooglePlacesSearchQuery={{
      //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      //     rankby: "distance"
      //   }}
      //   // filterReverseGeocodingByTypes={[
      //   //   "locality",
      //   //   "administrative_area_level_3"
      //   // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //   //predefinedPlaces={[homePlace, workPlace]}
      //   debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

      //   //renderRightButton={() => <Text>Custom text after the input</Text>}
      // />
    );
  }
}

export default Favorities;
