// Lokasi: P06-Shoplist/App.js atau P06-Shoplist/screens/MainScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [namaBarang, setNamaBarang] = useState('');

  // MASUKKAN KODE FUNGSI KONEKSI DI SINI
  const simpanKeMySQL = async () => {
    if (namaBarang === "") {
      Alert.alert("Error", "Isi nama barang dulu!");
      return;
    }

    try {
      // GANTI 192.168.3.115 dengan IP dari CMD (ipconfig)
      const response = await fetch('http://192.168.3.115/shoplist_api/aksi.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama_produk: namaBarang // Mengirim data dari TextInput
        }),
      });

      const hasil = await response.json();
      Alert.alert("Status", hasil.status);
      setNamaBarang(''); // Kosongkan input setelah berhasil
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Tidak bisa terhubung ke XAMPP. Cek koneksi Wi-Fi atau IP!");
    }
  };

  return (
    <View style={{ padding: 50 }}>
      <TextInput 
        placeholder="Nama Barang" 
        value={namaBarang}
        onChangeText={(teks) => setNamaBarang(teks)}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Simpan ke MySQL" onPress={simpanKeMySQL} />
    </View>
  );
}