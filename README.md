# Management Mobile Application

This application is built with React Native (Expo) and relies on Firebase for core features like Authentication, Firestore (database), and Cloud Messaging (Push Notifications).

To run this app on iOS or Android devices using Expo Application Services (EAS) or when creating a native build, you must connect it to a real Firebase project.

## How to Connect Firebase (iOS & Android)

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the instructions to create a new project.
3. Once the project is created, enable **Authentication** (Email/Password) and **Firestore Database** in the left-hand menu.

### Step 2: Register your iOS App
1. On the Firebase project overview page, click the **iOS** icon to add an app.
2. In the "Apple bundle ID" field, enter exactly what is in your `app.json` file. Currently, it is set to: `com.yourcompany.managementapp`. You can change this in `app.json` if needed.
3. Click **Register app**.
4. Download the `GoogleService-Info.plist` file.
5. Move this downloaded file into the **root directory** of this React Native project (the same folder as `app.json`).

### Step 3: Register your Android App
1. On the Firebase project overview page, click the **Android** icon to add an app.
2. In the "Android package name" field, enter exactly what is in your `app.json` file. Currently, it is set to: `com.yourcompany.managementapp`.
3. Click **Register app**.
4. Download the `google-services.json` file.
5. Move this downloaded file into the **root directory** of this React Native project.

### Step 4: Update Web/JS Config (Optional for Web/Mocking)
If you are running the app on the web or using Expo Go, the app currently uses a mock configuration in `src/firebase/config.js`.
To use real data on the web or Expo Go, open your Firebase project settings, scroll down to your web app configuration, and replace the `firebaseConfig` object in `src/firebase/config.js` with your real keys.

### Step 5: Build
Because we are using native Firebase SDKs (`@react-native-firebase/app`), you can no longer test native integrations inside the standard Expo Go app. You must create a development build.

To test on your device:
1. Install EAS CLI: `npm install -g eas-cli`
2. Run `eas build --profile development --platform android` (or `ios`)
3. Install the resulting app on your device or emulator.
