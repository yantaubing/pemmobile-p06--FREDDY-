import React, { createContext, useState } from 'react';

// 1. Buat Context-nya di sini (Tanpa Import dari luar)
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = (cartItems, total, address, payment) => {
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      total,
      address,
      payment,
      date: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    // 2. Gunakan Provider untuk membungkus children
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};