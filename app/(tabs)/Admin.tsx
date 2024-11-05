import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const Admin = () => {
  const [generalMoodPercentage, setGeneralMoodPercentage] = useState(0);
  const [moods, setMoods] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Récupérer les données de l'API
    fetch('http://10.76.204.34:3000/api/moods')

      .then((response) => response.json())
      .then((data) => {
        setMoods(data);
        calculateGeneralMood(data);
      });
  }, []);

  const calculateGeneralMood = (moods) => {
    let total = moods.length;
    let positive = moods.filter((mood) => mood.emoji === '😀' || mood.emoji === '😐').length; // Ajuster selon tes emojis
    let percentage = Math.round((positive / total) * 100);
    setGeneralMoodPercentage(percentage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats des humeurs</Text>

      {/* Cercle de pourcentage */}
      <Svg height="200" width="200">
        <Circle
          cx="100"
          cy="100"
          r="80"
          stroke="grey"
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="100"
          cy="100"
          r="80"
          stroke="green"
          strokeWidth="10"
          strokeDasharray={`${(2 * Math.PI * 80) * (generalMoodPercentage / 100)}, ${(2 * Math.PI * 80)}`}
          fill="none"
        />
      </Svg>
      <Text style={styles.percentageText}>{generalMoodPercentage}%</Text>

      {/* Bouton pour afficher les détails */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Afficher les détails</Text>
      </TouchableOpacity>

      {/* Modal pour afficher les détails */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Détails des humeurs</Text>
          <FlatList
            data={moods}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.moodItem}>
                <Text>{item.emoji} - {item.details || 'Pas de détails'}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  percentageText: { fontSize: 30, marginTop: 10 },
  button: { padding: 10, backgroundColor: 'blue', borderRadius: 5 },
  buttonText: { color: 'white' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { fontSize: 22, marginBottom: 20 },
  moodItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  closeButton: { padding: 10, backgroundColor: 'red', borderRadius: 5, marginTop: 20 },
  closeButtonText: { color: 'white' },
});

export default Admin;