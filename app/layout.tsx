import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arcdev",
  description: "Collaborative system design workspace.",
};

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorBackground: "#111114",
    colorForeground: "#18181c",
    colorPrimary: "#00c8d4",
    colorText: "#f0f0f4",
    colorTextSecondary: "#c0c0cc",
    colorNeutral: "#808090",
    colorInputBackground: "#080809",
    colorInputText: "#f0f0f4",
    colorBorder: "#2a2a30",
    borderRadius: "0.75rem",
  },
};

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in";
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={clerkAppearance}
          signInUrl={signInUrl}
          signUpUrl={signUpUrl}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
