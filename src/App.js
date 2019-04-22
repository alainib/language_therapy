/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, YellowBox, Text, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";


import styles from "number_therapy/src/styles";
import Comprehension from "number_therapy/src/stacknavigator/Comprehension";

YellowBox.ignoreWarnings([]);
console.disableYellowBox = true;


class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>

                <Button
                    title="Comprehension"
                    onPress={() => this.props.navigation.navigate('Comprehension')}
                />
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
}

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            ...removeHeader
        },
        Comprehension: {
            screen: Comprehension,
            ...removeHeader
        },
        // il faut déclarer ici les pages affichées dans le drawer pour avoir la bar en haut avec le bouton retour
        // StaticPage: { screen: StaticPage },

    },
    {
        mode: "modal",
    }
);

export default createAppContainer(StackNavigator);


