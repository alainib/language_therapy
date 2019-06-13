//Comprehension.js
import React from "react";
import { View, Text, Button } from "react-native";

import styles from "number_therapy/src/styles";

import { _DATA } from 'number_therapy/resources/data.json';

/*
import { db } from 'number_therapy/src/services/firebase';
  fb_writeUserData(email, fname, lname) {
        console.log("fb_writeUserData");
        db.ref('/Users/').set({
            email,
            fname,
            lname
        }).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }

    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            this.fb_writeUserData("ib@gmail.com" + i, "ibrahim" + i, "alain" + i);
        }
    }
    */

export default class Comprehension extends React.Component {
    state = {

    }



    render() {
        return (
            <View>
                <Text>writeUserData</Text>
            </View>
        )
    }
}
