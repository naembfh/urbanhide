"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/context/user.provider";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";



// Initialize the QueryClient
const queryClient = new QueryClient();

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
       <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
        <Toaster />
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
        </PersistGate>
        </Provider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default Providers;
