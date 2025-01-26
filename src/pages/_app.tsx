import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import { AuthProvider } from "@/components/Context/AuthContext";
import { SnackbarProvider } from "notistack";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={poppins.className}>
      <SnackbarProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App;