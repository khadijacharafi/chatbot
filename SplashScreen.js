import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔁 Navigation vers Welcome...');
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')} // Assure-toi que bg.jpg existe
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>Bienvenue sur ChatBot IA</Text>
        <ActivityIndicator size="large" color="#FFCD75" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // assombrit l'image
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFCD75',
    textAlign: 'center',
    marginBottom: 30,
  },
});
