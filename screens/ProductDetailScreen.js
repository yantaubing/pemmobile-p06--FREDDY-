import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }) {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);

  const isSoldOut = item.stock === 0;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* 🔹 IMAGE / HERO */}
        <View style={[styles.imageBox, { backgroundColor: item.bgColor || '#ddd' }]}>
          <Text style={styles.image}>{item.image || '📦'}</Text>
        </View>

        {/* 🔹 INFO */}
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.meta}>
            ⭐ {item.rating ?? 0} • {(item.sold ?? 0).toLocaleString('id-ID')} terjual
          </Text>

          <Text style={styles.price}>
            Rp {(item.price ?? 0).toLocaleString('id-ID')}
          </Text>

          <Text style={styles.stock}>
            Stok: {item.stock ?? 0}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
            <Text style={styles.desc}>
              {item.description || 'Produk berkualitas tinggi, cocok untuk kebutuhan Anda sehari-hari.'}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* 🔥 STICKY BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.cartBtn, isSoldOut && styles.disabled]}
          disabled={isSoldOut}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.cartText}>🛒</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buyBtn, isSoldOut && styles.disabled]}
          disabled={isSoldOut}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.buyText}>
            {isSoldOut ? 'Habis' : 'Beli Sekarang'}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  imageBox: {
    width: '100%',
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    fontSize: 80,
  },

  content: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 300, 
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#111827'
  },

  meta: {
    color: '#6b7280',
    fontSize: 13,
    marginBottom: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#e11d48',
    marginBottom: 10,
  },

  stock: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 15,
  },

  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#374151',
    fontSize: 16
  },
  desc: {
    color: '#4b5563',
    lineHeight: 22,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    paddingBottom: 24, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  cartBtn: {
    width: 60,
    height: 50,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  cartText: { fontSize: 22 },

  buyBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc'
  },
});
