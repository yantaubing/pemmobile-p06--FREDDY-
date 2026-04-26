import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      return Alert.alert('Error', 'Semua field wajib diisi');
    }

    if (password.length < 6) {
      return Alert.alert('Error', 'Password minimal 6 karakter');
    }

    if (password !== confirm) {
      return Alert.alert('Error', 'Password tidak sama');
    }

    try {
      await register(email.trim(), password);
    } catch (err) {
      Alert.alert('Register gagal', err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <Text style={styles.title}>Buat Akun ✨</Text>
      <Text style={styles.subtitle}>Daftar untuk mulai belanja</Text>

      {/* INPUT */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="Konfirmasi Password"
        value={confirm}
        onChangeText={setConfirm}
        style={styles.input}
        secureTextEntry
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,
          (!email || !password || !confirm) && styles.disabled
        ]}
        onPress={handleRegister}
        disabled={!email || !password || !confirm}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>
          Sudah punya akun? <Text style={{ fontWeight: 'bold' }}>Login</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb'
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 6
  },

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 14
  },

  button: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },

  disabled: {
    backgroundColor: '#ccc'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#374151'
  }
});