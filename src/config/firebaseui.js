import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

export const uiConfig = {
    signInSuccessUrl: '/portfolio',
    signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,requireDisplayName: true}
    ],
}

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebase.auth());

// export default ui;