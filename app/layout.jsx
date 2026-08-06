import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/session-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
import { ThemeProvider } from "@/components/providers/theme-provider";
const metadata = {
  title: "Al Shifa Clinic",
  description: "Modern Clinic Management System",
  manifest: "/manifest.json"
};
const viewport = {
  themeColor: "#ffffff"
};
function RootLayout({ children }) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <NextAuthProvider>
          <QueryProvider>
            <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>;
}
export {
  RootLayout as default,
  metadata,
  viewport
};
