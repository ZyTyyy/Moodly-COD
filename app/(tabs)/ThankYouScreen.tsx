import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importation du hook de navigation
import { router } from 'expo-router';

const ThankYouScreen: React.FC = () => {
  const navigation = useNavigation(); // Utilisation du hook de navigation

  const handleGoBack = () => {
    router.navigate('/');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_bewell.png')}
        style={styles.image}
      />
      <Text style={styles.thankYouText}>Merci de votre réponse</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b197fc', // Couleur de fond en dégradé violet
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  thankYouText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4C3F91',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ThankYouScreen;