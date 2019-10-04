//Comprehension.js
import React from "react";
import { View, Text, Button } from "react-native";

import styles from "language_therapy/src/styles";

import { dlzip, dezip, ls } from "language_therapy/src/services/update";




export default class UpdateData extends React.Component {
    state = {

    }

    async componentDidMount() {
        let zipPath = await dlzip();
        console.log(zipPath);

        let unzippedFolder = await dezip(zipPath);
        console.log(unzippedFolder);
        console.log(await ls(unzippedFolder));
    }

    render() {
        return (
            <View>
                <Text>Update data</Text>
            </View>
        )
    }
}

