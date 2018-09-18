import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = -18.9193508;
const LONGITUDE = -48.2830592;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const KML_FILE = "https://pastebin.com/raw/jAzGpq1F";
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 800,
//     width: null,
//     justifyContent: "flex-end",
//     alignItems: "center"
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject
//   }
// });

class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      kmlready: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };

    this.onKmlReady = this.onKmlReady.bind(this);
  }
  static navigationOptions = {
    title: "Explore"
  };
  onKmlReady() {
    this.map.fitToElements(true);
  }
  componentDidMount() {
    axios
      .get("https://pastebin.com/raw/jAzGpq1F")
      .then(res => {
        this.setState({ data: res.data });
        console.log(this.state.data);
      })
      .then(() => this.setState({ kmlready: true }))
      .catch(err => console.log(err));
  }

  // render() {
  //   const { region } = this.props;
  //   console.log(region);

  //     return (
  //       <View style={styles.container}>
  //         <MapView
  //           style={styles.map}
  //           region={{
  //             latitude: 37.78825,
  //             longitude: -122.4324,
  //             latitudeDelta: 0.015,
  //             longitudeDelta: 0.0121
  //           }}
  //         />
  //       </View>
  //     );
  //   }
  // }
  render() {
    const { data, kmlready, region } = this.state;
    return (
      <View style={styles.container}>
        {kmlready && (
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            provider={this.props.provider}
            style={styles.map}
            Region={region}
            kmlSrc={KML_FILE}
            onKmlReady={this.onKmlReady}
          />
        )}
      </View>
    );
  }
}
Explore.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  scrollview: {
    alignItems: "center",
    paddingVertical: 40
  },
  map: {
    width,
    height
  }
});

export default Explore;