import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from 'react-native';
// ✅ TAMBAHKAN IMPORT INI agar SafeAreaProvider berfungsi
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
// Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
// Screens
import ProductsGrid from "./screens/ProductsGrid"; // Perhatikan nama import ini (pakai 's')
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
 
const Stack = createNativeStackNavigator();
 
function MainApp() {
  const { user, loading } = useContext(AuthContext);
 
  // ⏳ Loading
  if (loading) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2ecc71' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {!user ? (
          // 🔐 BELUM LOGIN
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              // ✅ PERBAIKAN: headerShown harus boolean false, bukan string 'false'
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ title: 'Daftar' }}
            />
          </>
        ) : (
          // 🟢 SUDAH LOGIN
          <>
            <Stack.Screen 
              name="Home" 
              // ✅ PERBAIKAN: Sesuaikan dengan nama import 'ProductsGrid' (pakai 's')
              component={ProductsGrid} 
              options={{ title: 'Toko Online' }} 
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen} 
              options={{ title: 'Detail Produk' }}
            />
            <Stack.Screen 
              name="Cart" 
              component={CartScreen} 
              options={{ title: 'Keranjang Belanja' }}
            />
            <Stack.Screen 
              name="Checkout" 
              component={CheckoutScreen} 
              options={{ title: 'Pembayaran' }}
            />
            <Stack.Screen 
              name="History" 
              component={OrderHistoryScreen} 
              options={{ title: 'Riwayat Pesanan' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}