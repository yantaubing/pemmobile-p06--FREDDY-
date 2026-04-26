import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

import { CONTACTS_SECTIONS } from '../data/contacts';

// 🔹 ITEM KONTAK (Premium Style)
const ContactItem = ({ item }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() =>
      Alert.alert(
        item.name || 'Kontak',
        `📞 ${item.phone || '-'}`,
        [
          { text: "Batal" },
          { text: "Telepon", onPress: () => console.log("Call...") }
        ]
      )
    }
    activeOpacity={0.6}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {item.avatar || item.name?.charAt(0) || '👤'}
      </Text>
    </View>

    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>

    <View style={styles.actions}>
      <Text style={styles.icon}>💬</Text>
      <Text style={styles.icon}>📞</Text>
    </View>
  </TouchableOpacity>
);

// 🔹 HEADER SECTION (iOS STYLE)
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionText}>{title}</Text>
  </View>
);

export default function PremiumContacts() {
  const [search, setSearch] = useState('');

  // 🔍 FILTER KONTAK
  const filteredSections = useMemo(() => {
    return CONTACTS_SECTIONS.map(section => ({
      ...section,
      data: section.data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(section => section.data.length > 0);
  }, [search]);

  const total = filteredSections.reduce(
    (acc, s) => acc + s.data.length,
    0
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Cari kontak..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Kontak</Text>
        <Text style={styles.subtitle}>{total} kontak</Text>
      </View>

      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ContactItem item={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}