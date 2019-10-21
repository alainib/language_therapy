import React, { Component } from "react";
import {
  Button,
  YellowBox,
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "language_therapy/src/redux/store";
const { persistor, store } = configureStore();

import styles from "language_therapy/src/styles";
import Suivi from "language_therapy/src/stacknavigator/Suivi";
import DataChecker from "language_therapy/src/stacknavigator/DataChecker";
import TrainSerie from "language_therapy/src/stacknavigator/TrainSerie";
import Options from "language_therapy/src/stacknavigator/Options";
import Config from "language_therapy/src/Config";

YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;

import MotImage from "language_therapy/src/tabnavigator/MotImage";
import Users from "language_therapy/src/tabnavigator/Users";
import Settings from "language_therapy/src/tabnavigator/Settings";

const MyTabView = createBottomTabNavigator(
  {
    Users: { screen: Users },
    MotImage: { screen: MotImage },
    Settings: { screen: Settings }
  },
  {
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: Config.colors.green,
      pressColor: Config.colors.green,
      inactiveTintColor: "#373738",
      showIcon: true,
      style: {
        backgroundColor: Config.colors.background
      },
      indicatorStyle: {
        backgroundColor: Config.colors.green
      }
    }
  }
);

const removeHeader = {
  headerMode: "none",
  header: null,
  navigationOptions: {
    header: null
  }
};

const StackNavigator = createStackNavigator(
  {
    global: {
      screen: MyTabView,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },

    Suivi: {
      screen: Suivi,
      ...removeHeader
    },
    Options: {
      screen: Options,
      ...removeHeader
    },
    TrainSerie: {
      screen: TrainSerie,
      ...removeHeader
    },
    DataChecker: {
      screen: DataChecker,
      ...removeHeader
    }
  },
  {
    mode: "modal"
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.PureComponent {
  /*
       constructor(props) {
           super(props);
   
           this.state = {
   
           };
          
   store.subscribe(() => {
   // on check les changements d'état
   const storestate = store.getState();
       });
   
       }*/

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const thisstyles = StyleSheet.create({
  flex1grey: {
    ...styles.flex1,
    borderRightWidth: 1,
    borderColor: "grey"
  }
});
