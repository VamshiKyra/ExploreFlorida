import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Entypo";
import { SearchBar } from "react-native-elements";
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  ScrollView
} from "react-native";
import Geojson from "react-native-geojson";
import { StackActions, NavigationActions } from "react-navigation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import Details from "./Details";
import { green } from "../../node_modules/ansi-colors";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_APIKEY = "AIzaSyDzICKl_pd87hJVESAiMImhgz08wnNlTxU";
const getReady = false;
const alcatraz = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.03238901390978, 38.913188059745586]
      },
      properties: {
        letter: "G",
        color: "blue",
        rank: "7",
        ascii: "71"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        name: "TRON-02",
        serial: "TRON002",
        bearing: 0,
        color: "green",
        size: 15
      }
    }
  ]
};
const alcatraz1 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [180.0, 40.0],
              [180.0, 50.0],
              [170.0, 50.0],
              [170.0, 40.0],
              [180.0, 40.0]
            ]
          ],
          [
            [
              [-170.0, 40.0],
              [-170.0, 50.0],
              [-180.0, 50.0],
              [-180.0, 40.0],
              [-170.0, 40.0]
            ]
          ]
        ]
      },
      properties: {
        prop0: "value0"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]
      },
      properties: {
        prop0: "value0",
        prop1: 0.0
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]
        ]
      },
      properties: {
        prop0: "value0",
        prop1: {
          this: "that"
        }
      }
    }
  ]
};
const default_region = {
  latitude: 36.400144,
  longitude: -80.232523,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "",
        features: []
      },
      defaultAddress: "",
      region: default_region,
      initialPosition: true,
      findAddress: false,
      fetched: false,
      error: null,
      LatLng: {
        latitude: "",
        longitude: ""
      },
      markerStatus: false,
      searchMarkerDescription: ""
    };
  }
  static navigationOptions = {
    title: "Explore",
    tabBarIcon: <Icon name="map" size={25} color="#000" />
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (this.state.initialPosition) {
          this.setState({
            region: {
              latitude: parseFloat(position.coords.latitude),
              longitude: parseFloat(position.coords.longitude),
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            initialPosition: false
          });
          this._presentAddress();
        }
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    var URL =
      "https://opendata.arcgis.com/datasets/bd163c857f1b48c2b1f1a3a15dc8163d_4.geojson";
    axios
      .get(URL, {})
      .then(res => {
        this.setState({ data: res.data, fetched: true });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentWillMount() {
    //this._presentAddress();
    navigator.geolocation.clearWatch(this.watchId);
  }
  _presentAddress() {
    console.log("present address");
    console.log(this.state.region.latitude);
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          this.state.region.latitude +
          "," +
          this.state.region.longitude +
          "&key=" +
          GOOGLE_APIKEY,
        {}
      )
      .then(res => {
        console.log(res.data.results[0].formatted_address);
        if (res.data.results && res.data.results.length > 0) {
          this.setState({
            defaultAddress: res.data.results[0].formatted_address,
            findAddress: true
          });
          console.log(this.state.defaultAddress);
        }
      })
      .catch(e => console.log(e));
  }
  _addressSearch(searchString) {
    if (searchString.length > 0) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            searchString +
            "&key=" +
            GOOGLE_APIKEY,
          {}
        )
        .then(res => {
          if (res.data.results && res.data.results.length > 0) {
            var lat = res.data.results[0].geometry.location.lat;
            var lng = res.data.results[0].geometry.location.lng;
            var LatLng = {
              latitude: lat,
              longitude: lng
            };
            console.log(res.data.results[0]);
            var region = {
              latitude: lat,
              longitude: lng,
              latitudeDelta: LATITUDE_DELTA + 0.1,
              longitudeDelta: LONGITUDE_DELTA + 0.1
            };
            this.setState({
              region,
              LatLng,
              markerStatus: true,
              searchMarkerDescription: res.data.results[0].formatted_address
            });
          }
        })
        .catch(e => console.log(e));
    }
  }
  _placeMarker(details) {
    console.log(details);
    var LatLng = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    };
    const region = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.setState({
      region,
      LatLng,
      markerStatus: true,
      searchMarkerDescription: details.formatted_address
    });
  }
  render() {
    const { data, fetched } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          showsScale={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          style={styles.map}
          showsCompass={true}
          showsMyLocationButton={true}
          region={this.state.region}
        >
          {/* <Geojson geojson={alcatraz} title="Hello" description="description" /> */}
          {data.features.map(mark => {
            if (mark.geometry) {
              if (
                mark.geometry.coordinates[0] &&
                mark.geometry.coordinates[1]
              ) {
                const LatLng = {
                  latitude: mark.geometry.coordinates[1],
                  longitude: mark.geometry.coordinates[0]
                };
                return (
                  <Marker key={mark.properties.SITE_ID} coordinate={LatLng}>
                    <Callout
                      onPress={() =>
                        this.props.navigation.navigate("Details", {
                          title: mark.properties.LONGNAME,
                          description: mark.properties.AQI_CATEGORY
                        })
                      }
                    >
                      <Details
                        title={mark.properties.LONGNAME}
                        description={mark.properties.AQI_CATEGORY}
                        onPress={() =>
                          this.props.navigation.navigate("Details", {
                            title: mark.properties.LONGNAME,
                            description: mark.properties.AQI_CATEGORY
                          })
                        }
                      />
                    </Callout>
                  </Marker>
                );
              }
            }
          })}
          {this.state.markerStatus && (
            <Marker
              key={1}
              pinColor="#2ECCFA"
              coordinate={this.state.LatLng}
              title={this.state.searchMarkerDescription}
            />
          )}
        </MapView>
        <View style={styles.search_field_container}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="true" // true/false/undefined
            enablePoweredByContainer={false}
            fetchDetails={true}
            //defaultText={this.state.defaultAddress}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this._placeMarker(details);
              //this._addressSearch(details.description);
            }}
            //submitDefault={this.state.defaultAddress}
            // getDefaultValue={() => {
            //   console.log(this.state.defaultAddress);
            //   return this.state.defaultAddress;
            // }}
            query={{
              key: GOOGLE_APIKEY,
              language: "en"
            }}
            getDefaultValue={"this.state.defaultAddress"}
            styles={{
              poweredContainer: {
                opacity: 0
              },
              textInputContainer: {
                width: "100%",
                height: "20%"
              },
              textInput: {
                height: "70%"
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            onSubmitEditing={event => {
              console.log(event.nativeEvent.text);
              this._addressSearch(event.nativeEvent.text);
            }}
            renderDescription={row => row.description}
            textInputProps={{
              onChangeText: text => {
                this.setState({ defaultAddress: text });
                if (text.length === 0) {
                  console.log("text cleared");
                  const LatLng = {
                    latitude: "",
                    longitude: ""
                  };
                  this.setState({
                    LatLng,
                    markerStatus: false
                  });
                }
              }
            }}
            debounce={200}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  search_field_container: {
    height: 150,
    width: width,
    position: "absolute",
    top: 0
  },
  input_container: {
    alignSelf: "center",
    backgroundColor: "#FFF",
    opacity: 0.8,
    marginBottom: 25
  }
});
export default Explore;
