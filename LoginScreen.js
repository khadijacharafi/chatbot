import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'TON_CLIENT_ID_EXPO',
    iosClientId: 'TON_CLIENT_ID_IOS',
    androidClientId: 'TON_CLIENT_ID_ANDROID',
    webClientId: 'TON_CLIENT_ID_WEB',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('✅ Connexion Google réussie. Token :', authentication.accessToken);
      navigation.replace('Home');
    }
  }, [response]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    console.log('✅ Connexion réussie avec email.');
    navigation.replace('Home');
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>

        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Text style={styles.googleButtonText}>Se connecter avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('Signup')}>
          <Text style={styles.link}>
            Pas encore de compte ? <Text style={styles.linkBold}>Créer un compte</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={[styles.link, styles.secondaryLink]}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B2B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 25,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFCD75',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FFCD75',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFCD75',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#003B2B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFCD75',
  },
  googleButtonText: {
    color: '#003B2B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  linkBold: {
    color: '#FFCD75',
    fontWeight: 'bold',
  },
  secondaryLink: {
    marginTop: 8,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
  },
});
