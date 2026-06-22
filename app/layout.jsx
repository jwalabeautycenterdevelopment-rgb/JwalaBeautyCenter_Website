import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import AppWrapper from "./middleware/AppWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.jwalabeauty.com"),

  title: {
    default: "Jwala Beauty Center | Professional Makeup, Hair & Beauty Products",
    template: "%s | Jwala Beauty Center",
  },

  description:
    "Shop premium makeup, skincare, haircare, beauty tools, cosmetics, and professional beauty products at Jwala Beauty Center.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={plusJakartaSans.className}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}