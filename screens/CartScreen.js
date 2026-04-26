import React, { useContext } from 'react';
// 1. Hapus SafeAreaView jika ada di baris 'react-native'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// 2. Import SafeAreaView dari library yang benar
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useContext(CartContext);

  const isEmpty = !cartItems || cartItems.length === 0;
  const totalHarga = getTotalPrice ? getTotalPrice() : 0;

  return (
    // 3. Ganti View paling luar menjadi SafeAreaView
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Keranjang Belanja</Text>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 16, color: '#888' }}>
            Keranjang masih kosong 🛒
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>
                  Qty: {item.qty ?? 1} x Rp {(item.price ?? 0).toLocaleString('id-ID')}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Hapus Item", "Yakin ingin hapus?", [
                    { text: "Batal" },
                    { text: "Hapus", onPress: () => removeItem && removeItem(item.id) }
                  ])
                }
              >
                <Text style={styles.remove}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.total}>
          Total: Rp {totalHarga.toLocaleString('id-ID')}
        </Text>

        {!isEmpty && (
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Kosongkan", "Hapus semua item?", [
                { text: "Batal" },
                { text: "Ya", onPress: () => clearCart && clearCart() }
              ])
            }
          >
            <Text style={{ color: 'red', marginBottom: 10 }}>
              Kosongkan Keranjang
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, isEmpty && { backgroundColor: '#ccc' }]}
          onPress={() => !isEmpty && navigation.navigate('Checkout')}
          disabled={isEmpty}
        >
          <Text style={styles.buttonText}>
            Lanjut ke Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  remove: {
    color: 'red',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    // Memberi jarak aman untuk home indicator iPhone
    paddingBottom: 35, 
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});