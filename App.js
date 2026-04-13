import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import { auth } from './src/firebase/config';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/Auth/LoginScreen';
import { registerForPushNotificationsAsync, setupNotificationListeners } from './src/services/PushNotificationService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Auth Listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    // Push Notification Setup
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    const listeners = setupNotificationListeners();
    notificationListener.current = listeners.notificationListener;
    responseListener.current = listeners.responseListener;

    return () => {
      unsubscribeAuth();
      if (notificationListener.current) {
         Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
         Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const handleLoginSuccess = () => {
      setIsAuthenticated(true);
  };

  if (isLoading) {
      return null;
  }

  return (
    <PaperProvider>
      {isAuthenticated ? (
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
      ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </PaperProvider>
  );
}
