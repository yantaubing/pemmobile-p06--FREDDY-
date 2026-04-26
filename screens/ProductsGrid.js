import React, { useContext, useState } from 'react';
import {
  FlatList, Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { PRODUCTS } from "../data/Products";
import { CartContext } from "../context/CartContext";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 30) / 2;

export default function ProductsGrid() {
  const nav = useNavigation();
  const { addToCart, getTotalItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const isSoldOut = item.stock === 0;

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.bgColor || '#333' }]}
        activeOpacity={0.8}
        onPress={() => nav.navigate('ProductDetail', { item })}
      >

        {isSoldOut && (
          <View style={styles.sold}>
            <Text style={styles.soldText}>HABIS</Text>
          </View>
        )}

        <Text style={styles.image}>{item.image || '📦'}</Text>

        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          Rp {(item.price ?? 0).toLocaleString('id-ID')}
        </Text>

        <Text style={styles.meta}>
          ⭐ {item.rating ?? 0} | {(item.sold ?? 0).toLocaleString('id-ID')}
        </Text>

        <TouchableOpacity
          style={[styles.btn, isSoldOut && { backgroundColor: '#aaa' }]}
          disabled={isSoldOut}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.btnText}>
            {isSoldOut ? 'Habis' : '🛒 Tambah'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Marketplace</Text>

        <TouchableOpacity
          onPress={() => nav.navigate('Cart')}
          style={styles.cartIcon}
        >
          <Text style={{ fontSize: 22 }}>🛒</Text>

          {getTotalItems() > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {getTotalItems()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk impianmu..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearBtn}>
              <Text style={styles.clearIcon}>✖</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  clearBtn: {
    padding: 5,
  },
  clearIcon: {
    fontSize: 12,
    color: '#999',
  },

  cartIcon: { position: 'relative' },

  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  card: {
    width: ITEM_WIDTH,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 6
  },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  price: { color: '#fff', fontSize: 13, fontWeight: '600', marginBottom: 2 },
  meta: { color: '#fff', fontSize: 11, marginBottom: 8 },

  btn: {
    marginTop: 'auto',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 6,
    alignItems: 'center'
  },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  sold: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'red',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1
  },
  soldText: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});