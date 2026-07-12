import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyAG9zVrOA1i5E0_RcTNSfK73NEERrTdWfk',
  authDomain: 'penjualan-shop.firebaseapp.com',
  projectId: 'penjualan-shop',
  storageBucket: 'penjualan-shop.firebasestorage.app',
  messagingSenderId: '715234478906',
  appId: '1:715234478906:android:365ae345ba80a202d35e03',
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    auth = getAuth(app);
  }
}

export { app, auth };