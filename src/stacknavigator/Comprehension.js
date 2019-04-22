//Comprehension.js
import React from "react";
import { View, Text, Button } from "react-native";

import styles from "number_therapy/src/styles";


import {
    fb_writeUserData
} from "number_therapy/src/services";



export default class Comprehension extends React.Component {
    state = {

    }

    componentDidMount() {
        fb_writeUserData("ib@gmail.com", "ibrahim", "alain")
    }

    render() {
        return (
            <View>
                <Text>writeUserData</Text>
            </View>
        )
    }
}