"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#1c1917",
          color: "#f5f1ea",
          border: "1px solid #322c26",
          fontFamily: "var(--font-inter), sans-serif",
        },
        success: {
          iconTheme: {
            primary: "#d4a13d",
            secondary: "#1c1917",
          },
        },
        error: {
          iconTheme: {
            primary: "#c65b4f",
            secondary: "#1c1917",
          },
        },
      }}
    />
  );
}
