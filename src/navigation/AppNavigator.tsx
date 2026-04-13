import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import VisitorListScreen from '../screens/VMS/VisitorListScreen';
import ScanQRScreen from '../screens/VMS/ScanQRScreen';
import ManualRegisterScreen from '../screens/VMS/ManualRegisterScreen';

import FacilityScheduleScreen from '../screens/Facilities/FacilityScheduleScreen';
import ReportDefectScreen from '../screens/Facilities/ReportDefectScreen';

import SOSAlertsScreen from '../screens/Security/SOSAlertsScreen';
import IncidentReportingScreen from '../screens/Security/IncidentReportingScreen';

import MessagesListScreen from '../screens/Communication/MessagesListScreen';
import ChatScreen from '../screens/Communication/ChatScreen';

export type VMStackParamList = {
  VisitorList: undefined;
  ScanQR: undefined;
  ManualRegister: undefined;
};

export type FacilitiesStackParamList = {
  FacilitySchedule: undefined;
  ReportDefect: undefined;
};

export type SecurityStackParamList = {
  SOSAlerts: undefined;
  IncidentReporting: undefined;
};

export type CommunicationStackParamList = {
  MessagesList: undefined;
  Chat: { residentName: string; unit: string };
};

const Tab = createBottomTabNavigator();
const StackVM = createNativeStackNavigator<VMStackParamList>();
const StackFacilities = createNativeStackNavigator<FacilitiesStackParamList>();
const StackSecurity = createNativeStackNavigator<SecurityStackParamList>();
const StackCommunication = createNativeStackNavigator<CommunicationStackParamList>();

const VMStack = () => (
  <StackVM.Navigator>
    <StackVM.Screen name="VisitorList" component={VisitorListScreen} options={{ title: 'Visitor Log' }} />
    <StackVM.Screen name="ScanQR" component={ScanQRScreen} options={{ title: 'Scan QR' }} />
    <StackVM.Screen name="ManualRegister" component={ManualRegisterScreen} options={{ title: 'Manual Registration' }} />
  </StackVM.Navigator>
);

const FacilitiesStack = () => (
  <StackFacilities.Navigator>
    <StackFacilities.Screen name="FacilitySchedule" component={FacilityScheduleScreen} options={{ title: 'Facilities' }} />
    <StackFacilities.Screen name="ReportDefect" component={ReportDefectScreen} options={{ title: 'Report Defect' }} />
  </StackFacilities.Navigator>
);

const SecurityStack = () => (
  <StackSecurity.Navigator>
    <StackSecurity.Screen name="SOSAlerts" component={SOSAlertsScreen} options={{ title: 'SOS Alerts' }} />
    <StackSecurity.Screen name="IncidentReporting" component={IncidentReportingScreen} options={{ title: 'Report Incident' }} />
  </StackSecurity.Navigator>
);

const CommunicationStack = () => (
  <StackCommunication.Navigator>
    <StackCommunication.Screen name="MessagesList" component={MessagesListScreen} options={{ title: 'Messages' }} />
    <StackCommunication.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
  </StackCommunication.Navigator>
);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'alert';

          if (route.name === 'VMS') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Facilities') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Security') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'Communication') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
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
