/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { createAppContainer, createBottomTabNavigator, createStackNavigator } from "react-navigation";


class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>

                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}

const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            headerMode: "none",
            header: null,
            navigationOptions: {
                header: null
            }
        },
        Details: {
            screen: DetailsScreen,
            headerMode: "none",
            header: null,
            navigationOptions: {
                header: null
            }
        },
        // il faut déclarer ici les pages affichées dans le drawer pour avoir la bar en haut avec le bouton retour
        // StaticPage: { screen: StaticPage },

    },
    {
        mode: "modal",
        initialRouteName: "Home"
    }
);

export default createAppContainer(StackNavigator);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
