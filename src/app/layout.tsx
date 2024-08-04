import type { Metadata } from "next";
import { Inter, Poppins, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import homeData from "@/utils/data/homepage.json";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const man = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `Appointify - ${homeData.title}`,
  description: homeData.description,
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.className} `}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastContainer limit={1} />
          </ThemeProvider>
        </StoreProvider>
      </body>
      {process.env.NEXT_PUBLIC_ENV == "production" && (
        <>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GID || ""} />
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GID || ""} />
        </>
      )}
    </html>
  );
}
