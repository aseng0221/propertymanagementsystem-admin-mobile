import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SecurityStackParamList } from '../../navigation/AppNavigator';

type IncidentReportingScreenNavigationProp = NativeStackNavigationProp<SecurityStackParamList, 'IncidentReporting'>;

interface Props {
  navigation: IncidentReportingScreenNavigationProp;
}

const IncidentReportingScreen: React.FC<Props> = ({ navigation }) => {
  const [type, setType] = useState<string>('breach');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [actionTaken, setActionTaken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!location || !description) {
      Alert.alert("Location and Description are required.");
      return;
    }

    setLoading(true);
    // Mock submit
    setTimeout(() => {
        Alert.alert('Incident report submitted successfully!');
        setLoading(false);
        navigation.goBack();
    }, 1000);

    // In a real app:
    /*
    try {
      await db.collection('incidents').add({
        type, location, description, actionTaken, timestamp: firestore.FieldValue.serverTimestamp(),
      });
      ...
    */
  };

  return (
    <ScrollView style={styles.container}>
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[
          { value: 'breach', label: 'Security Breach' },
          { value: 'emergency', label: 'Emergency' },
          { value: 'other', label: 'Other' },
        ]}
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Incident Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Action Taken"
        value={actionTaken}
        onChangeText={setActionTaken}
        multiline
        numberOfLines={3}
        style={styles.input}
        mode="outlined"
      />

      <Button mode="contained" onPress={handleSubmit} loading={loading} style={styles.button}>
        Submit Report
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
    marginTop: 8,
    marginBottom: 32,
  },
});

export default IncidentReportingScreen;
