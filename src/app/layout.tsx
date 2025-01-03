import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Icons } from "./components/Icons";

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Simplified inventory management system",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900`}>
        <header className="bg-blue-100 text-grey-800 p-4 border-b-2 border-blue-200 
        dark:bg-blue-900 dark:text-white dark:border-blue-600">
          <div className="inline-flex items-center space-x-2">
            <span className="inline"><Icons.ArchiveBox className="size-12 sm:size-6 mr-1 text-blue-900 dark:text-blue-100"/></span>
            <h1 className="hidden lg:block text-2xl font-bold text-blue-900 dark:text-blue-100">Inventory Management System</h1>
          </div>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="text-grey-600 text-center py-4 mt-auto">
          &copy; 2024 Inventory Management System
        </footer>
      </body>
    </html>
  );
}
