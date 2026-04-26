import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('COD');

  const isEmpty = !cartItems || cartItems.length === 0;

  const handleCheckout = () => {
    if (isEmpty) {
      Alert.alert("Error", "Keranjang masih kosong!");
      return;
    }

    if (!address.trim()) {
      Alert.alert("Error", "Alamat harus diisi!");
      return;
    }

    createOrder(cartItems, getTotalPrice(), address, payment);
    clearCart();

    Alert.alert("Sukses", "Pesanan berhasil dibuat!", [
      { text: "OK", onPress: () => navigation.navigate('History') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Alamat Pengiriman</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Masukkan alamat lengkap"
      />

      <Text style={styles.label}>Metode Pembayaran</Text>
      <TextInput
        style={styles.input}
        value={payment}
        onChangeText={setPayment}
        placeholder="COD / Transfer / E-Wallet"
      />

      <Text style={styles.total}>
        Total: Rp {getTotalPrice().toLocaleString('id-ID')}
      </Text>

      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  }
});