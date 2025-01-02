import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import { sql } from "@vercel/postgres";
import { Suspense } from "react";
import Link from "next/link";
import { SurfSpots } from "@/components/surf/spots-summary";
import { SpotSummaryFallback } from "@/components/fallbacks/spot-summary-fallback";
import { ChatInput } from "./chat-input";

export default async function Home() {
  return (
    <Section>
      <Container>
        <Content />
        <Suspense fallback={<SpotSummaryFallback />}>
          <SurfSpotWrapper />
        </Suspense>
      </Container>
    </Section>
  );
}

// SurfSpots
const SurfSpotWrapper = async () => {
  const spots = (await sql`SELECT * FROM spot LIMIT 5`).rows as SurfSpot[];
  return <SurfSpots spots={spots} />;
};

// Content
const Content = () => {
  return (
    <div>
      <h1 className="text-center md:text-5xl font-bold font-serif">
        <Balancer>Surf Finder</Balancer>
      </h1>
      <p className="text-center text-muted-foreground">
        Surf Finder is a SoCal surf forecast and surf spot information website.
      </p>
      <ChatInput />
      <div className="flex gap-8 justify-center not-prose my-6">
        <Link
          href="/spots"
          className="hover:scale-110 transition-all duration-300 flex flex-col items-center"
        >
          {" "}
          <span className="text-4xl md:text-7xl">📍</span>
          <p className="text-xs text-center">Spots</p>
        </Link>
        <Link
          href="/posts"
          className="hover:scale-110 transition-all duration-300 flex flex-col items-center"
        >
          <span className="text-4xl md:text-7xl">📠</span>
          <p className="text-xs text-center">Blog</p>
        </Link>
      </div>
    </div>
  );
};
