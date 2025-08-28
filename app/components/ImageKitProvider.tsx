"use client";

import { ImageKitProvider } from 'imagekitio-next';
import { ReactNode } from 'react';

export default function ClientImageKitProvider({ children }: { children: ReactNode }) {
  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT__KEY!}
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT!}
    >
      {children}
    </ImageKitProvider>
  );
}