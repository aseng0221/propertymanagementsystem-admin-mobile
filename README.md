# Management Mobile Application

This application is built with **bare React Native CLI** (not Expo) and relies on Firebase for core features like Authentication, Firestore (database), and Cloud Messaging (Push Notifications).

To run this app and utilize Firebase features on iOS or Android devices, you must connect it to a real Firebase project.

## How to Connect Firebase (iOS & Android)

### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the instructions to create a new project.
3. Once the project is created, enable **Authentication** (Email/Password) and **Firestore Database** in the left-hand menu.

### Step 2: Register your iOS App
1. On the Firebase project overview page, click the **iOS** icon to add an app.
2. In the "Apple bundle ID" field, enter: `org.reactjs.native.example.ManagementApp`.
3. Click **Register app**.
4. Download the `GoogleService-Info.plist` file.
5. Move this downloaded file into the `ios/` folder of your project root (e.g. `ios/GoogleService-Info.plist`). *Note: If opening in Xcode, ensure the file is added to your target.*

### Step 3: Register your Android App
1. On the Firebase project overview page, click the **Android** icon to add an app.
2. In the "Android package name" field, enter: `com.managementapp`.
3. Click **Register app**.
4. Download the `google-services.json` file.
5. Move this downloaded file into the `android/app/` folder of your project root (e.g. `android/app/google-services.json`).

### Step 4: Run the App
Since this is a bare React Native app, you will need to compile the native code to run it on an emulator or physical device.

**Start Metro Bundler:**
```bash
npm run start
```

**Run on Android:**
```bash
npm run android
```

**Run on iOS:**
```bash
npm run ios
```
*(Note: iOS development requires a Mac and Xcode installed. If you encounter pod installation issues, you may need to `cd ios && pod install` first.)*
