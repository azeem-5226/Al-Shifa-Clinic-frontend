import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/session-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.alshifaclinic.com"),
  title: {
    default: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
    template: "%s | Al Shifa Clinic",
  },
  description:
    "Al Shifa Clinic is an all-in-one clinic management software for doctors in India. Manage patients, digital prescriptions, appointments, and billing from one modern platform.",
  keywords: [
    "clinic management software",
    "doctor management system",
    "patient management system India",
    "digital prescription software",
    "hospital management software",
    "clinic billing software",
    "EMR software India",
    "Al Shifa Clinic",
    "appointment scheduling for clinics",
    "polyclinic software",
  ],
  authors: [{ name: "Al Shifa Clinic", url: "https://www.alshifaclinic.com" }],
  creator: "Al Shifa Clinic",
  publisher: "Al Shifa Clinic",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.alshifaclinic.com",
    siteName: "Al Shifa Clinic",
    title: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
    description:
      "Run your entire clinic from one modern platform. Manage patients, prescriptions, appointments & billing. Trusted by 500+ clinics across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al Shifa Clinic — Clinic Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Shifa Clinic — Modern Clinic Management Software for Doctors",
    description:
      "Run your entire clinic from one modern platform. Manage patients, prescriptions, appointments & billing. Trusted by 500+ clinics across India.",
    images: ["/og-image.png"],
    creator: "@alshifaclinic",
  },
  verification: {
    google: "d7961352525eb210",
  },
  alternates: {
    canonical: "https://www.alshifaclinic.com",
  },
};

export const viewport = {
  themeColor: "#1a56db",
  width: "device-width",
  initialScale: 1,
};
function RootLayout({ children }) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
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
export default RootLayout;
