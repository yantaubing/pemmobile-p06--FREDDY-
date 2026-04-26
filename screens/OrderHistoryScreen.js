import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { OrderContext } from '../context/OrderContext';

export default function OrderHistoryScreen() {
  const { orders } = useContext(OrderContext);

  const isEmpty = !orders || orders.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: '#888' }}>
          Belum ada pesanan 🛍️
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.date}>📅 {item.date}</Text>

          <Text style={styles.total}>
            Rp {(item.total ?? 0).toLocaleString('id-ID')}
          </Text>

          <Text style={styles.info}>
            📍 {item.address}
          </Text>

          <Text style={styles.info}>
            💳 {item.payment}
          </Text>

          {/* BONUS: jumlah item */}
          <Text style={styles.items}>
            {item.items?.length || 0} item
          </Text>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3
  },

  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6
  },

  info: {
    fontSize: 13,
    color: '#374151'
  },

  items: {
    marginTop: 6,
    fontSize: 12,
    color: '#9ca3af'
  }
});