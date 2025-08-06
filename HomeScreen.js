import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const userName = route?.params?.userName || 'Utilisateur';

  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' },
  ]);
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: 'user', text: input },
      { from: 'bot', text: 'Ceci est une réponse simulée.' },
    ]);
    setInput('');
  };

  return (
    <ImageBackground
      source={require('../assets/img1.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER */}
        <ImageBackground
          source={require('../assets/img11.jpg')}
          style={styles.header}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.title}>Bienvenue, {userName} 👋</Text>

            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setShowHistory((prev) => !prev)}
              >
                <Text style={styles.headerButtonText}>
                  {showHistory ? '💬 Chat' : '📜 Historique'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.headerButtonText}>⚙️ Paramètres</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* CHAT OR HISTORY */}
        <View style={styles.chatContainer}>
          {showHistory ? (
            <ScrollView style={styles.chatBox}>
              <Text style={styles.sectionTitle}>📜 Historique des messages</Text>
              {messages.map((msg, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.message,
                    msg.from === 'user' ? styles.userMsg : styles.botMsg,
                  ]}
                >
                  <Text style={styles.messageText}>
                    {msg.from === 'user' ? 'Vous : ' : 'Bot : '}
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <>
              <ScrollView style={styles.chatBox}>
                {messages.map((msg, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.message,
                      msg.from === 'user' ? styles.userMsg : styles.botMsg,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.text}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Posez votre question..."
                  placeholderTextColor="#aaa"
                  value={input}
                  onChangeText={setInput}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                  <Text style={styles.sendText}>➤</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: height * 0.25,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 59, 43, 0.8)',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: '#FFCD75',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerButton: {
    backgroundColor: '#FFCD75',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  headerButtonText: {
    color: '#003B2B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 59, 43, 0.9)',
    margin: 15,
    marginTop: 0,
    borderRadius: 20,
    padding: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFCD75',
    textAlign: 'center',
    marginVertical: 10,
  },
  message: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFCD75',
  },
  botMsg: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendText: {
    color: '#FFCD75',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
