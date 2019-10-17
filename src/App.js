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

import { createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "language_therapy/src/redux/store";
const { persistor, store } = configureStore();

import Users from "language_therapy/src/components/Users";
import styles from "language_therapy/src/styles";
import Suivi from "language_therapy/src/stacknavigator/Suivi";
import MotImage from "language_therapy/src/stacknavigator/MotImage";
import TrainSerie from "language_therapy/src/stacknavigator/TrainSerie";
import DataChecker from "language_therapy/src/stacknavigator/DataChecker";

import Options from "language_therapy/src/stacknavigator/Options";

YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;

class Home extends Component {
  render() {
    return (
      <View style={styles.containerCol}>
        <View style={thisstyles.flex1grey}>
          <Users />
        </View>

        <View style={styles.flex1}>
          <ScrollView style={styles.flex1}>
            <Text style={styles.title}>Choisir le type d'exercice :</Text>
            <View style={styles.margin10}>
              <Button
                title="Mot - Image"
                onPress={() => this.props.navigation.navigate("MotImage")}
              />
            </View>

            <View style={styles.margin10}>
              <Button
                containerStyle={styles.margin10}
                title="Suivi"
                onPress={() => this.props.navigation.navigate("Suivi")}
              />
            </View>
            <View style={styles.margin10}>
              <Button
                containerStyle={styles.margin10}
                title="Verification des données"
                onPress={() => this.props.navigation.navigate("DataChecker")}
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
