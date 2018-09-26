import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { SearchBar, List, ListItem } from "react-native-elements";
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Keyboard,
  TouchableOpacity
} from "react-native";
import Geojson from "react-native-geojson";
import { StackActions, NavigationActions } from "react-navigation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import Details from "./Details";
import { green } from "../../node_modules/ansi-colors";
import Qs from "qs";

let { width, height } = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
      sampledata: [],
      googledata: [],
      defaultAddress: "",
      textinput: "",
      region: default_region,
      initialPosition: true,
      updateregion: default_region,
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
    this._renderPlaces = this._renderPlaces.bind(this);
  }
  static navigationOptions = {
    title: "Explore",
    tabBarIcon: <Icon name="map" size={25} color="#000" />
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (this.state.initialPosition) {
          console.log("here");
          this.setState({
            updateregion: {
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
    console.log("autocomplete");

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
  renderSeparator = () => {
    if (this.state.sampledata.length <= 0) {
      return <View />;
    } else {
      return (
        <View
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%"
          }}
        />
      );
    }
  };
  _renderAutocomplete(textinput) {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" +
          textinput +
          "&" +
          Qs.stringify({
            key: GOOGLE_APIKEY,
            language: "en"
          })
      )
      .then(res => {
        // console.log(res);
        this.setState({ googledata: res.data.predictions });
      })
      .catch(e => console.log(e));
    //console.log(this.state.googledata);
  }
  _renderSampleData() {
    console.log("rendersampledata");
    axios
      .get("https://randomuser.me/api/?results=5", {})
      .then(res => {
        //console.log(res);
        this.setState({
          sampledata: [...this.state.sampledata, ...res.data.results]
        });
        console.log(this.state.sampledata);
      })
      .catch(error => console.log(error));
    //console.log(this.state.sampledata);
  }
  componentWillMount() {
    //this._presentAddress();
    this._renderSampleData();
    navigator.geolocation.clearWatch(this.watchId);
  }
  _presentAddress() {
    console.log("present address");
    console.log(this.state.region.latitude);
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          this.state.updateregion.latitude +
          "," +
          this.state.updateregion.longitude +
          "&key=" +
          GOOGLE_APIKEY,
        {}
      )
      .then(res => {
        console.log(res.data.results[0].formatted_address);
        if (res.data.results && res.data.results.length > 0) {
          this.setState({
            textinput: res.data.results[0].formatted_address,
            findAddress: true
          });
          console.log(this.state.defaultAddress);
        }
      })
      .catch(e => console.log(e));
  }
  _myCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("here");
        this.setState({
          updateregion: {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          initialPosition: false
        });
        this._presentAddress();
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
    this._clearMarker();
  }
  _getGoogleData(place_id) {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/details/json?" +
          Qs.stringify({
            key: GOOGLE_APIKEY,
            placeid: place_id,
            language: "en"
          })
      )
      .then(res => this._placeMarker(res.data.result))
      .catch(error => console.log(error));
  }
  renderHeader() {
    return (
      <SearchBar
        inputContainerStyle={{ backgroundColor: "white", height: 70 }}
        clearIcon={
          <Icon
            name="cross"
            size={20}
            color="#000"
            //onPress={this._clearMarker()}
          />
        }
        onChangeText={textinput => {
          console.log(textinput);
          this.setState({ textinput });
          this._renderAutocomplete(textinput);
          if (textinput.length === 0) {
            this._clearMarker();
          }
        }}
        value={this.state.textinput}
        placeholder="Search"
        onSubmitEditing={event => {
          console.log(event.nativeEvent.text);
          this.setState({ googledata: [] });
          this._addressSearch(event.nativeEvent.text);
        }}
      />
    );
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
            //console.log(res.data.results[0]);
            var updateregion = {
              latitude: lat,
              longitude: lng,
              latitudeDelta: LATITUDE_DELTA + 0.1,
              longitudeDelta: LONGITUDE_DELTA + 0.1
            };
            this.setState({
              updateregion,
              LatLng,
              markerStatus: true,
              searchMarkerDescription: res.data.results[0].formatted_address
            });
          }
        })
        .catch(e => console.log(e));
    }
  }
  _clearMarker() {
    console.log("this time");
    this.setState({
      markerStatus: false,
      LatLng: {
        latitude: "",
        longitude: ""
      }
    });
  }
  handleInputChange = textinput =>
    this.setState(state => ({ ...state, textinput: textinput || "" }));

  handleSearchCancel = () => this.handleInputChange("");
  handleSearchClear = () => {
    this.handleInputChange("");
    console.log("new");
  };
  _placeMarker(details) {
    var LatLng = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    };
    const updateregion = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    this.setState({
      updateregion,
      LatLng,
      markerStatus: true,
      searchMarkerDescription: details.formatted_address
    });
  }
  _renderPlaces = places => {
    console.log(places);
  };
  _renderRow = rowData => {
    return (
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={{ backgroundColor: "white" }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <TouchableHighlight
          style={{ width }}
          onPress={() => console.log(rowData)}
          underlayColor={"#c8c7cc"}
          keyboardShouldPersistTaps={"always"}
        >
          <View keyboardShouldPersistTaps={"always"}>
            <Text>{rowData}</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    );
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
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.updateregion}
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
          <FlatList
            style={{ backgroundColor: "white", marginTop: 60 }}
            data={this.state.googledata}
            keyboardShouldPersistTaps={"handled"}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.description}`}
                onPress={() => {
                  this._renderPlaces(`${item.description}`);
                  this.setState({
                    googledata: [],
                    textinput: `${item.description}`
                  });
                  this._getGoogleData(`${item.place_id}`);
                  Keyboard.dismiss();
                }}
              />
            )}
            ListHeaderComponent={this.renderHeader()}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
            width: 65,
            position: "absolute",
            bottom: 10,
            right: 10,
            height: 65,
            backgroundColor: "#fff",
            borderRadius: 100
          }}
          onPress={() => this._myCurrentLocation()}
        >
          <MaterialIcon name="my-location" size={30} color="black" />
        </TouchableOpacity>
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
    width: width,
    position: "absolute",
    top: -40
  },
  input_container: {
    alignSelf: "center",
    backgroundColor: "#FFF",
    opacity: 0.8,
    marginBottom: 25
  },
  row: {
    padding: 13,
    height: 48,
    flexDirection: "row"
  }
});
export default Explore;
