import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppContextProvider } from "@/utils/Context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Providers from "@/providers";
import ClientLayout from "@/components/client-layout";

export const metadata: Metadata = {
  title: "Sentigen Dashboard",
  description: "Modern crypto dashboard",
  icons: {
    icon: "/favlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="bg-[#0d0d0d]">{children}</div>
            </ThemeProvider>
          </AppContextProvider>{" "}
        </Providers>
      </body>
    </html>
  );
}
