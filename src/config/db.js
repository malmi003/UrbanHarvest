import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyDRR6xWAqEI0OIZy6IG9d-qrdfTCMGTV1U",
   authDomain: "urbanharvest-76a09.firebaseapp.com",
   databaseURL: "https://urbanharvest-76a09.firebaseio.com/",
   projectId: "urbanharvest-76a09",
   storageBucket: "urbanharvest-76a09.appspot.com",
};
firebase.initializeApp(config);
export const db = firebase.database();
