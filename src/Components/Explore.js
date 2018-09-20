import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
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
      properties: {
        title: "Title can be created",
        description: "description can also be created"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.42305755615234, 37.82687023785448]
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
      fetched: false
    };
  }

  componentDidMount() {
    console.log("componetdidmount");
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

  onClickDetails = details => {
    <Details details={details} />;
  };
  render() {
    const { data, fetched } = this.state;
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({
    //       routeName: "Menu"
    //     })
    //   ]
    // });
    // this.props.navigation.dispatch(resetAction);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={{ ...StyleSheet.absoluteFillObject }}
          region={{
            latitude: 30.400197,
            longitude: -84.232482,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Geojson geojson={alcatraz} title="Hello" description="description" />
          {/* {data.features.map(mark => {
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
          })} */}
        </MapView>
      </View>
    );
  }
}

export default Explore;
