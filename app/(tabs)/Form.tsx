import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Alert, Modal, TextInput } from 'react-native';
import axios from 'axios';
import { Link, router } from 'expo-router';

const moods = [
  { name: 'Heureux', emoji: '😀' },
  { name: 'Fatigué', emoji: '😪' },
  { name: 'Neutre', emoji: '😐' },
  { name: 'Frustré', emoji: '😣' },
  { name: 'Stressé', emoji: '😖' },
  { name: 'Triste', emoji: '😢' },
];

const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState<string>('');

  // Fonction pour envoyer les données au serveur
  const sendMoodToServer = async () => {
    try {
      const response = await axios.post('http://10.76.204.34:3000/api/mood', {
        emoji: selectedMood,
        details: description,
      });
      console.log('Réponse du serveur:', response.data);
      Alert.alert('Succès', 'Votre humeur a été envoyée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'humeur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de votre humeur.');
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setModalVisible(true); // Ouvrir le modal quand on sélectionne une humeur
  };

  const handleSubmit = () => {
    if (selectedMood) {
      sendMoodToServer(); // Envoyer les informations au serveur
    } else {
      Alert.alert('Sélectionnez une humeur', 'Veuillez sélectionner une humeur avant de valider.');
    }
    setModalVisible(false); // Fermer le modal après la validation
    router.navigate('./ThankYouScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quelle est votre humeur aujourd'hui ?</Text>

      <View style={styles.anonymeContainer}>
        <Image source={require('../../assets/images/anonymous.png')} style={styles.anonymeIcon} />
        <Text style={styles.anonymeText}>Anonyme</Text>
      </View>

      <View style={styles.moodsContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.name}
            style={[
              styles.moodButton,
              selectedMood === mood.name && styles.selectedMoodButton,
            ]}
            onPress={() => handleMoodSelect(mood.name)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.moodText}>{mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Valider</Text>
      </TouchableOpacity>

      {/* Modal pour entrer des détails */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Pourquoi vous vous sentez {selectedMood} ?</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez les détails ici..."
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
            <Button title="Soumettre" onPress={handleSubmit} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  anonymeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  anonymeIcon: {
    width: 16,
    height: 20,
    marginRight: 8,
  },
  anonymeText: {
    fontSize: 16,
    color: 'white',
  },
  moodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#a29bfe',
  },
  selectedMoodButton: {
    backgroundColor: '#81ecec',
  },
  emoji: {
    fontSize: 40,
  },
  moodText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
});

export default MoodSelector;