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

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      region: default_region,
      initialPosition: true,
      fetched: false,
      error: null
    };
  }
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
    navigator.geolocation.clearWatch(this.watchId);
  }
  static navigationOptions = {
    title: "Explore",
    tabBarIcon: <Icon name="map" size={25} color="#000" />
  };
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
          showsTraffic={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          style={styles.map}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
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
        </MapView>
        <View style={styles.search_field_container}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={3} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="true" // true/false/undefined
            query={{
              key: "AIzaSyDzICKl_pd87hJVESAiMImhgz08wnNlTxU",
              language: "en"
            }}
            debounce={200}
          />
          {/* <ScrollView>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </ScrollView> */}
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
