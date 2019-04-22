import firebase from "react-native-firebase";


var config = {
    apiKey: "AIzaSyDLbmfgOhApTVS-YaK8tTjE_7eLsGcZZZU",
    appId: "1:995805498896:android:42ce7bc07823f1a0",
    authDomain: "number-therapy.firebaseapp.com",
    databaseURL: "https://number-therapy.firebaseio.com",
    projectId: "number-therapy",
    storageBucket: "number-therapy.appspot.com",
    messagingSenderId: "995805498896"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

console.log("firebase initializeApp");

function fb_writeUserData(email, fname, lname) {
    console.log("fb_writeUserData");
    firebase.database().ref('/Users/').set({
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

export { fb_writeUserData };