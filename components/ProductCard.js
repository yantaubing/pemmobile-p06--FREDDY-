import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.emoji}>
          {item?.image || '📦'}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.category}>
          {item?.category || 'Produk'}
        </Text>

        <Text style={styles.name} numberOfLines={2}>
          {item?.name || 'Tanpa Nama'}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.rating}>
            ⭐ {item?.rating ?? 0}
          </Text>

          <Text style={styles.sold}>
            {(item?.sold ?? 0).toLocaleString('id-ID')} terjual
          </Text>
        </View>

        <Text style={styles.price}>
          Rp {(item?.price ?? 0).toLocaleString('id-ID')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 72,
    height: 72,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 36,
  },
  info: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366f1',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
    marginRight: 10,
  },
  sold: {
    fontSize: 11,
    color: '#9ca3af',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
});

export default ProductCard;