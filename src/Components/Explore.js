import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Entypo";
import { AppRegistry, StyleSheet, Dimensions, Text, View } from "react-native";
import Geojson from "react-native-geojson";
import { StackActions, NavigationActions } from "react-navigation";
import axios from "axios";
import Details from "./Details";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = -18.9193508;
const LONGITUDE = -48.2830592;
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
class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: "",
        features: []
      },
      fetched: false,
      latitude: 30.400144,
      longitude: -84.232523,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      error: null
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
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
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          // latitude: parseFloat(position.coords.latitude),
          // longitude: parseFloat(position.coords.longitude),
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
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          showsScale={true}
          showsTraffic={true}
          zoomEnabled={true}
          style={{
            ...StyleSheet.absoluteFillObject,
            padding: 1,
            marginLeft: 0
          }}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
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
      </View>
    );
  }
}

export default Explore;
