import firebase from 'firebase/app';

//Add the firebase database product
import 'firebase/database';

//from porject settigns in Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxCGFDMvdNorFzlhTD9LE7giC6Sr_9yBw",
    authDomain: "shoppies-4db62.firebaseapp.com",
    projectId: "shoppies-4db62",
    storageBucket: "shoppies-4db62.appspot.com",
    messagingSenderId: "218223704913",
    appId: "1:218223704913:web:3d7916f33b42c015253170"
}

//Initialize firebase
firebase.initializeApp(firebaseConfig);

export default firebase;