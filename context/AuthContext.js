import React, { createContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Auto login Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🆕 REGISTER
  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error?.code === 'auth/email-already-in-use') {
        throw new Error('Email ini sudah terdaftar. Silakan login atau gunakan email lain.');
      }
      if (error?.code === 'auth/weak-password') {
        throw new Error('Password terlalu lemah. Gunakan minimal 6 karakter.');
      }
      if (error?.code === 'auth/invalid-email') {
        throw new Error('Format email tidak valid.');
      }
      if (error?.code === 'auth/network-request-failed') {
        throw new Error('Koneksi internet bermasalah. Coba lagi.');
      }
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};