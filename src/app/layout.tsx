import type { Metadata, Viewport } from "next";
import { EB_Garamond, Manrope } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

export const viewport: Viewport = {
  themeColor: "#0c0b0c",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Título fixo na aba em todas as páginas.
  title: "Dr. Eduardo Bonifácio",
  description: site.description,
  applicationName: "Dr. Eduardo Bonifácio",
  authors: [{ name: "Dr. Eduardo Bonifácio" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dr. Eduardo Bonifácio",
    title: "Dr. Eduardo Bonifácio | Advogado em Uberaba/MG",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@eduardocorrebo2",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${garamond.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
