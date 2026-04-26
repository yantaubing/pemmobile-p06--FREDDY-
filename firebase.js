import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konfigurasi firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyAG9zVrOA1i5E0_RcTNSfK73NEERrTdWfk",  // ~39 karakter, ASLI
  authDomain: "penjualan-shop.firebaseapp.com",
  projectId: "penjualan-shop",
  storageBucket: "penjualan-shop.firebasestorage.app",  // ✅ Format yang benar
  messagingSenderId: "715234478906",             // 12 digit ASLI (Project Number)
  appId: "1:715234478906:android:365ae345ba80a202d35e03" // ASLI dari Firebase
};

// Inisialisasi App
const app = initializeApp(firebaseConfig);

// ✅ PERBAIKAN: Tambahkan persistence agar login tidak hilang
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };