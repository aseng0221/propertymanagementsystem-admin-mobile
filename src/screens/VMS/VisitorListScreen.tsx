import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, FAB, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db } from '../../firebase/config';
import { VMStackParamList } from '../../navigation/AppNavigator';

type VisitorListScreenNavigationProp = NativeStackNavigationProp<VMStackParamList, 'VisitorList'>;

interface Props {
  navigation: VisitorListScreenNavigationProp;
}

interface VisitorData {
  id: string;
  name?: string;
  type?: string;
  timestamp?: any;
}

const VisitorListScreen: React.FC<Props> = ({ navigation }) => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Native Firebase Firestore syntax
    const unsubscribe = db.collection('visitors')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        if (!snapshot) {
             setLoading(false);
             return;
        }
        const visitorData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as VisitorData[];
        setVisitors(visitorData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching visitors:", error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.container}><Text>Loading visitors...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visitors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${item.type} - ${new Date(item.timestamp?.toDate?.() || Date.now()).toLocaleString()}`}
            left={props => <List.Icon {...props} icon="account" />}
          />
        )}
        ListEmptyComponent={<Text style={{ padding: 20 }}>No visitors found.</Text>}
      />
      <FAB
        style={styles.fabScan}
        icon="qrcode-scan"
        onPress={() => navigation.navigate('ScanQR')}
      />
      <FAB
        style={styles.fabAdd}
        icon="plus"
        onPress={() => navigation.navigate('ManualRegister')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabScan: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
  fabAdd: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default VisitorListScreen;
