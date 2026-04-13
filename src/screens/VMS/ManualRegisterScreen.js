import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ManualRegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('');
  const [type, setType] = useState('visitor');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !unit) {
      alert("Name and Unit are required.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'visitors'), {
        name,
        phone,
        unit,
        type,
        timestamp: serverTimestamp(),
      });
      alert('Registered successfully!');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[
          { value: 'visitor', label: 'Visitor' },
          { value: 'contractor', label: 'Contractor' },
          { value: 'walk-in', label: 'Walk-in' },
        ]}
        style={styles.input}
      />
      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Visiting Unit (e.g., 10-05)"
        value={unit}
        onChangeText={setUnit}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
        Register Entry
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
