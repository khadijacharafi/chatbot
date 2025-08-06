import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


const screenWidth = Dimensions.get('window').width;

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Colonne image à gauche */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Colonne texte et boutons à droite */}
      <View style={styles.rightContainer}>
        <View style={styles.content}>
          <Animatable.Text
            animation="fadeInDown"
            duration={2000}
            style={styles.title}
     >
       Prête à discuter ?{'\n'}Bienvenue dans votre {'\n'} assistant intelligent !
        </Animatable.Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#003B2B',
  },
  imageContainer: {
    width: screenWidth * 0.4,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 34, // ⬆️ Taille du texte agrandie
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 44,
  },
  button: {
    backgroundColor: '#FFCD75',
    paddingVertical: 15, // ⬆️ Hauteur augmentée
    paddingHorizontal: 50,
    borderRadius: 35,
    marginVertical: 15,
    width: 250, // ⬆️ Largeur augmentée
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18, // ⬆️ Texte du bouton agrandi
    fontWeight: 'bold',
  },
});
