import type { Metadata } from "next";
import Link from "next/link";
import { Wrench } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Maintenance",
  description: "Report and track maintenance problems around campus",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <header className="border-b bg-card">
          <nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Wrench className="size-5 text-primary" aria-hidden />
              Campus Maintenance
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/requests"
                className="text-muted-foreground hover:text-foreground"
              >
                Requests
              </Link>
              <Link
                href="/requests/new"
                className="text-muted-foreground hover:text-foreground"
              >
                Report a problem
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t py-4 text-center text-xs text-muted-foreground">
          GIU Software Project I — Campus Maintenance
        </footer>
      </body>
    </html>
  );
}
