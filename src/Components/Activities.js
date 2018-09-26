import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
class Activities extends Component {
  state = {
    activities: []
  };
  static navigationOptions = {
    title: "Activities",
    tabBarIcon: <Icon name="md-walk" size={25} color="#000" />
  };
  render() {
    return <View />;
  }
}
// function Activities(props) {
//   return <Icon name="ios-person" size={30} color="#4F8EF7" />;
// }
export default Activities;
// import React, { Component } from "react";
// import { View, Text, FlatList, ActivityIndicator } from "react-native";
// import { List, ListItem, SearchBar } from "react-native-elements";
// import Icon from "react-native-vector-icons/Ionicons";
// class Activities extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//       page: 1,
//       seed: 1,
//       error: null,
//       refreshing: false
//     };
//   }
//   static navigationOptions = {
//     title: "Activities",
//     tabBarIcon: <Icon name="md-walk" size={25} color="#000" />
//   };
//   componentDidMount() {
//     this.makeRemoteRequest();
//   }

//   makeRemoteRequest = () => {
//     const { page, seed } = this.state;
//     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
//     this.setState({ loading: true });

//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         this.setState({
//           data: page === 1 ? res.results : [...this.state.data, ...res.results],
//           error: res.error || null,
//           loading: false,
//           refreshing: false
//         });
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
//   };

//   handleRefresh = () => {
//     this.setState(
//       {
//         page: 1,
//         seed: this.state.seed + 1,
//         refreshing: true
//       },
//       () => {
//         this.makeRemoteRequest();
//       }
//     );
//   };

//   handleLoadMore = () => {
//     this.setState(
//       {
//         page: this.state.page + 1
//       },
//       () => {
//         this.makeRemoteRequest();
//       }
//     );
//   };

//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: "86%",
//           backgroundColor: "#CED0CE",
//           marginLeft: "14%"
//         }}
//       />
//     );
//   };

//   renderHeader = () => {
//     return <SearchBar placeholder="Type Here..." lightTheme round />;
//   };

//   renderFooter = () => {
//     if (!this.state.loading) return null;

//     return (
//       <View
//         style={{
//           paddingVertical: 20,
//           borderTopWidth: 1,
//           borderColor: "#CED0CE"
//         }}
//       >
//         <ActivityIndicator animating size="large" />
//       </View>
//     );
//   };

//   render() {
//     return (
//       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
//         <FlatList
//           data={this.state.data}
//           renderItem={({ item }) => (
//             <ListItem
//               roundAvatar
//               title={`${item.name.first} ${item.name.last}`}
//               subtitle={item.email}
//               avatar={{ uri: item.picture.thumbnail }}
//               containerStyle={{ borderBottomWidth: 0 }}
//             />
//           )}
//           keyExtractor={item => item.email}
//           ItemSeparatorComponent={this.renderSeparator}
//           ListHeaderComponent={this.renderHeader}
//           ListFooterComponent={this.renderFooter}
//           onRefresh={this.handleRefresh}
//           refreshing={this.state.refreshing}
//           onEndReached={this.handleLoadMore}
//           onEndReachedThreshold={50}
//         />
//       </List>
//     );
//   }
// }

// export default Activities;
