import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import AppWrapper from "./middleware/AppWrapper";

export const metadata = {
  title: "Jwala Beauty - Your One-Stop Shop for All Things Beauty",
  description: "Project setup with Redux, Framer Motion, and Tailwind v4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
