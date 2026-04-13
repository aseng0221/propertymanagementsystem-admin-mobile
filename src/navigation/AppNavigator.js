import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import VisitorListScreen from '../screens/VMS/VisitorListScreen';
import ScanQRScreen from '../screens/VMS/ScanQRScreen';
import ManualRegisterScreen from '../screens/VMS/ManualRegisterScreen';

import FacilityScheduleScreen from '../screens/Facilities/FacilityScheduleScreen';
import ReportDefectScreen from '../screens/Facilities/ReportDefectScreen';

import SOSAlertsScreen from '../screens/Security/SOSAlertsScreen';
import IncidentReportingScreen from '../screens/Security/IncidentReportingScreen';

import MessagesListScreen from '../screens/Communication/MessagesListScreen';
import ChatScreen from '../screens/Communication/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const VMStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="VisitorList" component={VisitorListScreen} options={{ title: 'Visitor Log' }} />
    <Stack.Screen name="ScanQR" component={ScanQRScreen} options={{ title: 'Scan QR' }} />
    <Stack.Screen name="ManualRegister" component={ManualRegisterScreen} options={{ title: 'Manual Registration' }} />
  </Stack.Navigator>
);

const FacilitiesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FacilitySchedule" component={FacilityScheduleScreen} options={{ title: 'Facilities' }} />
    <Stack.Screen name="ReportDefect" component={ReportDefectScreen} options={{ title: 'Report Defect' }} />
  </Stack.Navigator>
);

const SecurityStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SOSAlerts" component={SOSAlertsScreen} options={{ title: 'SOS Alerts' }} />
    <Stack.Screen name="IncidentReporting" component={IncidentReportingScreen} options={{ title: 'Report Incident' }} />
  </Stack.Navigator>
);

const CommunicationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MessagesList" component={MessagesListScreen} options={{ title: 'Messages' }} />
    <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'VMS') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Facilities') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Security') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'Communication') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="VMS" component={VMStack} />
      <Tab.Screen name="Facilities" component={FacilitiesStack} />
      <Tab.Screen name="Security" component={SecurityStack} />
      <Tab.Screen name="Communication" component={CommunicationStack} />
    </Tab.Navigator>
  );
}
