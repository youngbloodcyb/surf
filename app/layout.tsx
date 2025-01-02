import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { Main } from "@/components/craft";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AI } from "@/lib/actions/chat";
import { MessageCircleMore } from "lucide-react";

const mainMenu = {
  home: "/",
  blog: "/posts",
  spots: "/spots",
  news: "/news",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Surf",
  description: "Surf reports and forecasts",
  metadataBase: new URL("https://surf.cameron.so"),
};

// Revalidate content every hour
// export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Nav />
        <AI>
          <Main>{children}</Main>
        </AI>
        <Footer />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "sticky z-50 top-0 bg-background",
        "border-b",
        "fade-in",
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">next-wp starter</h2>
          <Image
            src={Logo}
            alt="Logo"
            className="dark:invert"
            width={42}
            height={26.44}
          ></Image>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="/chat">
              Chat <MessageCircleMore />
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                className="dark:invert"
                width={42}
                height={26.44}
              ></Image>
            </Link>
            <p>
              <Balancer>Surf info and forecasts</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <p className="text-muted-foreground">
            © <a href="https://9d8.dev">Surf</a>. All rights reserved.
            2025-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
