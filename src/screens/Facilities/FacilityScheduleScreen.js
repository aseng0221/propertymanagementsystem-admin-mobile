import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, FAB, Text, Button } from 'react-native-paper';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function FacilityScheduleScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock bookings for demonstration if Firestore is empty
    const mockBookings = [
        { id: '1', facility: 'BBQ Pit 1', resident: 'John Doe', unit: '12-04', time: '18:00 - 22:00', status: 'Pending' },
        { id: '2', facility: 'Function Room', resident: 'Jane Smith', unit: '05-11', time: '14:00 - 18:00', status: 'Checked In' },
    ];
    setBookings(mockBookings);
    setLoading(false);

    // In a real app, listen to Firestore:
    /*
    const q = query(collection(db, 'bookings'), orderBy('time'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
    */
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Checked In' : 'Checked Out';

    // Update local state for mock
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));

    // In a real app, update Firestore:
    /*
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating booking status", error);
    }
    */
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading schedule...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={`${item.facility} - ${item.time}`}
            description={`${item.resident} (${item.unit}) - ${item.status}`}
            left={props => <List.Icon {...props} icon="calendar" />}
            right={props => (
                <Button
                    mode="text"
                    onPress={() => handleStatusChange(item.id, item.status)}
                    disabled={item.status === 'Checked Out'}
                >
                    {item.status === 'Pending' ? 'Check In' : item.status === 'Checked In' ? 'Check Out' : 'Done'}
                </Button>
            )}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="alert"
        label="Report Defect"
        onPress={() => navigation.navigate('ReportDefect')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
