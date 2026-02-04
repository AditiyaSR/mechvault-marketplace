import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MechVault - Premium Engineering Assets Marketplace",
  description: "Find quality CAD models, 3D files, and blueprints for Mechanical, Architecture, and DIY projects. Trusted by engineers worldwide.",
  keywords: ["CAD", "3D Models", "Engineering", "Blueprints", "SolidWorks", "AutoCAD", "Mechanical", "Architecture", "3D Print"],
  authors: [{ name: "MechVault Team" }],
  openGraph: {
    title: "MechVault - Premium Engineering Assets",
    description: "Your trusted marketplace for CAD files, 3D models, and blueprints",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MechVault - Premium Engineering Assets",
    description: "Your trusted marketplace for CAD files, 3D models, and blueprints",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
