import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// React Native Firebase uses native configuration files (google-services.json for Android,
// GoogleService-Info.plist for iOS) instead of initializing with a config object in JS.

// Check if app is already initialized, otherwise initialize it.
// This is typically only needed if you are manually initializing,
// but usually @react-native-firebase/app auto-initializes.
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp({
        // Dummy config to bypass ts error since Native uses native files.
        // Real initialization is picked up by gradle/xcode automatically.
        appId: '1:123456789012:web:mockappid',
        projectId: 'mock-project-id'
    });
} else {
    app = firebase.app();
}

const db = firestore();

// Firestore offline persistence is enabled by default in @react-native-firebase/firestore
// Settings can be customized if needed.

const firebaseAuth = auth();

export { app, db, firebaseAuth as auth };
