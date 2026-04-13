import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, FAB, Text, useTheme } from 'react-native-paper';
import { db } from '../../firebase/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SecurityStackParamList } from '../../navigation/AppNavigator';

type SOSAlertsScreenNavigationProp = NativeStackNavigationProp<SecurityStackParamList, 'SOSAlerts'>;

interface Props {
  navigation: SOSAlertsScreenNavigationProp;
}

interface AlertData {
  id: string;
  type: string;
  unit: string;
  resident: string;
  time: Date;
}

const SOSAlertsScreen: React.FC<Props> = ({ navigation }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const theme = useTheme();

  useEffect(() => {
    // Mock SOS alerts
    const mockAlerts: AlertData[] = [
        { id: '1', type: 'Medical Emergency', unit: '08-12', resident: 'Alice Brown', time: new Date(Date.now() - 1000 * 60 * 5) },
        { id: '2', type: 'Suspicious Activity', unit: 'Basement Carpark', resident: 'Unknown', time: new Date(Date.now() - 1000 * 60 * 30) },
    ];
    setAlerts(mockAlerts);

    // In a real app, listen to Firestore:
    /*
    const unsubscribe = db.collection('sos_alerts')
      .orderBy('time', 'desc')
      .onSnapshot((snapshot) => {
        if (!snapshot) return;
        // Process snapshot...
      });
    return () => unsubscribe();
    */
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.type}
            titleStyle={{ color: theme.colors.error, fontWeight: 'bold' }}
            description={`Location: ${item.unit}\nReported by: ${item.resident}\nTime: ${item.time.toLocaleTimeString()}`}
            descriptionNumberOfLines={3}
            left={props => <List.Icon {...props} icon="alert-decagram" color={theme.colors.error} />}
            style={styles.listItem}
          />
        )}
        ListEmptyComponent={<Text style={{ padding: 20, textAlign: 'center' }}>No active SOS alerts.</Text>}
      />
      <FAB
        style={styles.fab}
        icon="file-document-edit"
        label="Log Incident"
        onPress={() => navigation.navigate('IncidentReporting')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default SOSAlertsScreen;
