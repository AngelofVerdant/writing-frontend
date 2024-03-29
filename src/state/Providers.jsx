"use client";

import { AuthProvider, DarkModeProvider, CartProvider } from ".";

export function Providers({ children }) {
  return (
    <DarkModeProvider>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
    </DarkModeProvider>
  );
}