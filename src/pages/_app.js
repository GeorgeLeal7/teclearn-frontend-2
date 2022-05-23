import { AppThemeProvider, DrawerProvider } from "../shared/contexts";
import { AuthProvider } from "../shared/contexts/AuthAdmContext";
import "./globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <Component {...pageProps} />
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};

export default MyApp;
