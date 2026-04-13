import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { auth } from './src/firebase/config';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/Auth/LoginScreen';
import { registerForPushNotificationsAsync, setupNotificationListeners } from './src/services/PushNotificationService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pushToken, setPushToken] = useState('');

  useEffect(() => {
    // Auth Listener
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    // Push Notification Setup
    registerForPushNotificationsAsync().then(token => setPushToken(token));

    const listeners = setupNotificationListeners();

    return () => {
      unsubscribeAuth();
      if (listeners.unsubscribeOnMessage) {
          listeners.unsubscribeOnMessage();
      }
      if (listeners.unsubscribeOnNotificationOpenedApp) {
          listeners.unsubscribeOnNotificationOpenedApp();
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
