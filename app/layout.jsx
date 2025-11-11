import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import ProtectedRoute from "../app/protectedRoute/ProtectedRoute";

export const metadata = {
  title: "Jwala Beauty - Your One-Stop Shop for All Things Beauty",
  description: "Project setup with Redux, Framer Motion, and Tailwind v4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <Header />
          {/* <ProtectedRoute> */}
            <main>{children}</main>
          {/* </ProtectedRoute> */}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
