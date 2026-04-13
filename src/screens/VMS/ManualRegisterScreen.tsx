import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { db } from '../../firebase/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VMStackParamList } from '../../navigation/AppNavigator';

type ManualRegisterScreenNavigationProp = NativeStackNavigationProp<VMStackParamList, 'ManualRegister'>;

interface Props {
  navigation: ManualRegisterScreenNavigationProp;
}

const ManualRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [type, setType] = useState<string>('visitor');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (!name || !unit) {
      Alert.alert("Name and Unit are required.");
      return;
    }

    setLoading(true);
    try {
      await db.collection('visitors').add({
        name,
        phone,
        unit,
        type,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Registered successfully!');
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Failed to register.');
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
};

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

export default ManualRegisterScreen;
