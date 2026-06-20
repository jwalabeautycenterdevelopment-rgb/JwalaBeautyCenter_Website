import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import AppWrapper from "./middleware/AppWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Jwala Beauty - Your One-Stop Shop for All Things Beauty",
  description: "Project setup with Redux, Framer Motion, and Tailwind v4",
  metadataBase: new URL("https://jwalabeautycenter.com"),
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