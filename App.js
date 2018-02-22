import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ReduxThunk from "redux-thunk";
import DeckMain from "./components/DeckMain";
import AddEntry from "./components/AddEntry";
import { purple, black, blue } from "./utils/colors";
import { Constants } from "expo";
import reducer from "./reducers";

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckMain,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-home" size={30} color={tintColor} />
      )
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "Flash Cards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckMain: {
    screen: DeckMain,
    navigationOptions: {
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "purple"
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="purple"
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
