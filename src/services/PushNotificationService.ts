import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
          console.log('Failed to get push token for push notification (iOS)!');
          return undefined;
      }
  }

  try {
      // Get the native FCM token
      token = await messaging().getToken();
      console.log("FCM Push Token:", token);

      // Next step in real app: send token to backend / Firestore to associate with this user
  } catch (e) {
      console.error("Error getting FCM push token:", e);
  }

  return token;
}

export function setupNotificationListeners(): { unsubscribeOnMessage: () => void, unsubscribeOnNotificationOpenedApp: () => void } {
  // Listen for foreground notifications
  const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('A new FCM message arrived in the foreground!', JSON.stringify(remoteMessage));
  });

  // Listen for notifications when the app is in the background and the user taps it
  const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
      // Navigation logic could go here
  });

  // Check if app was opened from a quit state by tapping a notification
  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    });

  return { unsubscribeOnMessage, unsubscribeOnNotificationOpenedApp };
}
