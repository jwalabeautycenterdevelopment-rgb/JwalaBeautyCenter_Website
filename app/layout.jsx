import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import AppWrapper from "./middleware/AppWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://www.jwalabeauty.com"),

  title: {
    default: "Jwala Beauty Center | Professional Makeup, Hair & Beauty Products",
    template: "%s | Jwala Beauty Center",
  },

  description:
    "Shop premium makeup, skincare, haircare, beauty tools, cosmetics, and professional beauty products at Jwala Beauty Center. Discover top beauty brands at the best prices.",

  keywords: [
    "Jwala Beauty",
    "Beauty Products",
    "Makeup Products",
    "Hair Care",
    "Skin Care",
    "Cosmetics",
    "Beauty Store",
    "Professional Makeup",
    "Beauty Center",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Jwala Beauty Center",
    description:
      "Shop premium makeup, skincare, haircare, beauty tools, cosmetics, and professional beauty products.",
    url: "https://www.jwalabeauty.com",
    siteName: "Jwala Beauty Center",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jwala Beauty Center",
    description:
      "Shop premium makeup, skincare, haircare, beauty tools, cosmetics, and professional beauty products.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}