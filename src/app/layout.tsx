import type { Metadata } from "next";
import StoreProvider from "@/shared_features/store/StoreProvider";

export const metadata: Metadata = {
  title: "FinTrack - Expense Tracker",
  description: "Enterprise Financial Budget Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}