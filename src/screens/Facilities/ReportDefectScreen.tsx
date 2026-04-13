import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { db } from '../../firebase/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FacilitiesStackParamList } from '../../navigation/AppNavigator';

type ReportDefectScreenNavigationProp = NativeStackNavigationProp<FacilitiesStackParamList, 'ReportDefect'>;

interface Props {
  navigation: ReportDefectScreenNavigationProp;
}

const ReportDefectScreen: React.FC<Props> = ({ navigation }) => {
  const [facility, setFacility] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const takePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri || null);
    }
  };

  const handleSubmit = async () => {
    if (!facility || !description) {
      Alert.alert("Facility and Description are required.");
      return;
    }

    setLoading(true);
    try {
      // Note: In a real app, upload the image to Firebase Storage first,
      // then save the URL to Firestore.
      await db.collection('defects').add({
        facility,
        description,
        imageUri: image, // Mocking image storage
        timestamp: firestore.FieldValue.serverTimestamp(),
        status: 'Reported'
      });
      Alert.alert('Defect reported successfully!');
      navigation.goBack();
    } catch (error) {
      console.error("Error reporting defect: ", error);
      Alert.alert('Failed to report defect.');
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
};

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

export default ReportDefectScreen;
