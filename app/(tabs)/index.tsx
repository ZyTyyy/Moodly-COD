import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';

const FirstPage = () => {
  return (
    <View style={styles.container}>
      {/* Fond avec LinearGradient */}
      <LinearGradient
        colors={['#8A2BE2', '#C9A3FF']}
        style={styles.background}
      >
        {/* Texte de bienvenue */}
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue</Text>
          <Text style={styles.subtitle}>Votre bien-être, notre priorité</Text>

          {/* Bouton Commencer */}
          <TouchableOpacity style={styles.button} onPress={() => router.navigate('./Login2')}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>

        {/* Logo en bas */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo_bewell.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>BeWell</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      alignItems: 'center',
      marginTop: 100,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 30,
    },
    buttonText: {
      fontSize: 18,
      color: '#8A2BE2',
      fontWeight: 'bold',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    logoText: {
      fontSize: 20,
      color: '#8A2BE2',
      fontWeight: 'bold',
    },
  });
  
  export default FirstPage;