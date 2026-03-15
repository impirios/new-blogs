import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog — Yogesh Bhardwaj",
  description: "Writing about JavaScript, design patterns, and software engineering.",
};

const themeScript = `
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <header className="border-b border-neutral-100 dark:border-neutral-800">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              blog.
            </Link>
            <ThemeToggle />
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
        <footer className="border-t border-neutral-100 dark:border-neutral-800">
          <div className="mx-auto max-w-3xl px-6 py-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
            Built with Next.js & Markdown
          </div>
        </footer>
      </body>
    </html>
  );
}
