import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();

  // Données profil
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Mot de passe
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveProfile = () => {
    if (!name || !email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du profil.');
      return;
    }

    // 👉 Appel API plus tard
    Alert.alert('✅ Profil mis à jour !');
  };

  const handleChangePassword = () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs du mot de passe.');
      return;
    }

    if (newPass !== confirmPass) {
      Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    // 👉 Appel API plus tard
    Alert.alert('✅ Mot de passe modifié avec succès !');
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>⚙️ Paramètres</Text>

      {/* Section modifier le profil */}
      <Text style={styles.sectionTitle}>🧑 Modifier le profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Enregistrer le profil</Text>
      </TouchableOpacity>

      {/* Section changer mot de passe */}
      <Text style={styles.sectionTitle}>🔒 Changer le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Ancien mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={oldPass}
        onChangeText={setOldPass}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={newPass}
        onChangeText={setNewPass}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmer le nouveau mot de passe"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Modifier le mot de passe</Text>
      </TouchableOpacity>

      {/* Déconnexion */}
      <TouchableOpacity style={[styles.button, styles.logout]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutText]}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003B2B',
    padding: 20,
    paddingTop: 50,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFCD75',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFCD75',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFCD75',
  },
  button: {
    backgroundColor: '#FFCD75',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#003B2B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logout: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
  logoutText: {
    color: '#FF4C4C',
  },
});
