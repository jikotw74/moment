import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAzmYVPQ0ciJPLZrU3MqBfBTCw11eh3BJA",
    authDomain: "moment-c7f66.firebaseapp.com",
    databaseURL: "https://moment-c7f66.firebaseio.com",
    projectId: "moment-c7f66",
    storageBucket: "moment-c7f66.appspot.com",
    messagingSenderId: "234565228463"
}

firebase.initializeApp(config);
const database = firebase.database();

export default database;