/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Button,
  YellowBox,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "language_therapy/src/redux/store";
const { persistor, store } = configureStore();

import Users from "language_therapy/src/components/Users";
import styles from "language_therapy/src/styles";
import Suivi from "language_therapy/src/stacknavigator/Suivi";
import MotImage from "language_therapy/src/stacknavigator/MotImage";
// import UpdateData from "language_therapy/src/stacknavigator/UpdateData";
import Options from "language_therapy/src/stacknavigator/Options";

YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;

class Home extends Component {
  render() {
    return (
      <View style={styles.containerCol}>
        <View
          style={{
            ...styles.flex1,
            borderRightWidth: 1,
            borderColor: "#d6d7da"
          }}
        >
          <Users />
        </View>

        <View style={styles.flex1}>
          <ScrollView style={styles.flex1}>
            <Text style={styles.title}>Choisir le type d'exercice :</Text>
            <View style={{ margin: 10 }}>
              <Button
                title="Mot - Image"
                onPress={() => this.props.navigation.navigate("MotImage")}
              />
            </View>
            {/*
            <View style={{ margin: 10 }}>
              <Button
                containerStyle={{ margin: 10 }}
                title="UpdateData"
                onPress={() => this.props.navigation.navigate("UpdateData")}
              />
            </View>
             */}

            <View style={{ margin: 10 }}>
              <Button
                containerStyle={{ margin: 10 }}
                title="Suivi"
                onPress={() => this.props.navigation.navigate("Suivi")}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const removeHeader = {
  headerMode: "none",
  header: null,
  navigationOptions: {
    header: null
  }
};

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      ...removeHeader
    },
    MotImage: {
      screen: MotImage,
      ...removeHeader
    },
    Suivi: {
      screen: Suivi,

      ...removeHeader
    },
    Options: {
      screen: Options,
      ...removeHeader
    }
    /*UpdateData: {
      screen: UpdateData,
      ...removeHeader
    }*/
    // il faut déclarer ici les pages affichées dans le drawer pour avoir la bar en haut avec le bouton retour
    // StaticPage: {screen: StaticPage },
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
