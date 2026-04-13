import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ReportDefectScreen({ navigation }) {
  const [facility, setFacility] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!facility || !description) {
      alert("Facility and Description are required.");
      return;
    }

    setLoading(true);
    try {
      // Note: In a real app, upload the image to Firebase Storage first,
      // then save the URL to Firestore.
      await addDoc(collection(db, 'defects'), {
        facility,
        description,
        imageUri: image, // Mocking image storage
        timestamp: serverTimestamp(),
        status: 'Reported'
      });
      alert('Defect reported successfully!');
      navigation.goBack();
    } catch (error) {
      console.error("Error reporting defect: ", error);
      alert('Failed to report defect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Facility (e.g., Gym, Pool)"
        value={facility}
        onChangeText={setFacility}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Description of Defect"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
        mode="outlined"
      />

      <View style={styles.buttonRow}>
          <Button mode="outlined" icon="camera" onPress={takePhoto} style={styles.mediaButton}>
            Take Photo
          </Button>
          <Button mode="outlined" icon="image" onPress={pickImage} style={styles.mediaButton}>
            Gallery
          </Button>
      </View>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <Button mode="contained" onPress={handleSubmit} loading={loading} style={styles.submitButton}>
        Submit Report
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
  buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
  },
  mediaButton: {
      flex: 0.48,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});
