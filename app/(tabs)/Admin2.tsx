import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import * as Progress from 'react-native-progress';

const Admin = () => {
  const [generalMoodPercentage, setGeneralMoodPercentage] = useState(83); // Pourcentage d'humeur générale
  const [moods, setMoods] = useState([
    { emoji: '😁', percentage: 100 },
    { emoji: '😐', percentage: 50 },
    { emoji: '😡', percentage: 30 },
    { emoji: '😢', percentage: 10 },
    { emoji: '😠', percentage: 20 },
    { emoji: '😞', percentage: 40 }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  // Gestion de l'affichage des détails
  const handleShowDetails = () => {
    console.log("Afficher les détails des humeurs...");
    // Action à ajouter pour afficher les détails dans une autre vue ou un modal
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Humeur du jour</Text>

      {/* Cercle de pourcentage */}
      <Progress.Circle
        size={150}
        progress={generalMoodPercentage / 100}
        showsText={true}
        formatText={() => `${generalMoodPercentage}%`}
        textStyle={{ color: '#fff' }}
        color="green"
        unfilledColor="#e0e0e0"
        borderWidth={0}
        thickness={10}
        style={styles.circle}
      />
      <Text style={styles.positiveText}>{generalMoodPercentage >= 50 ? 'Positive' : 'Négative'}</Text>

      {/* Liste des émojis avec pourcentages */}
      <FlatList
        data={moods}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.moodRow}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.percentage}>{item.percentage}%</Text>
          </View>
        )}
      />

      {/* Bouton pour afficher les détails */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Afficher les détails</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: '#6A4DFF',
    alignItems: 'center',
    paddingTop: 50
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20
  },
  circle: {
    marginVertical: 20
  },
  positiveText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    paddingVertical: 10
  },
  emoji: {
    fontSize: 32
  },
  percentage: {
    fontSize: 18,
    color: '#fff'
  },
  detailsButton: {
    marginTop: 40,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16
  },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalTitle: { fontSize: 22, marginBottom: 20 },
  moodItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  closeButton: { padding: 10, backgroundColor: 'red', borderRadius: 5, marginTop: 20 },
  closeButtonText: { color: 'white' },
});

export default Admin;