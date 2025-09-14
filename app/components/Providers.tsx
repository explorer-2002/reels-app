"use client"

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import { FC } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider>{children}</ImageKitProvider>
    </SessionProvider>
  );
}

// app/providers.tsx

export const ThemeProvider:FC<ThemeProviderProps> = ({ children, ...props }: ThemeProviderProps) =>{
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}