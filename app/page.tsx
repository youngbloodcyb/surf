import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import { sql } from "@vercel/postgres";
import { Suspense } from "react";
import Link from "next/link";
import { File, Pen, Tag, Boxes, User, Folder, Send } from "lucide-react";
import { SurfSpots } from "@/components/surf/spots-summary";
import { SpotSummaryFallback } from "@/components/fallbacks/spot-summary-fallback";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <h1 className="text-center">
        <Balancer>Surf City</Balancer>
      </h1>
      <p className="text-center">
        Surf City is a surf forecast and surf spot information website.
      </p>
      <div className="flex gap-2 max-w-96 mx-auto my-6">
        <Input placeholder="Ask about the waves..." className="flex-1" />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <div className="flex gap-8 justify-center not-prose my-6">
        <Link
          href="/spots"
          className="hover:scale-110 transition-all duration-300 flex flex-col items-center"
        >
          {" "}
          <span className="text-7xl">📍</span>
          <p className="text-xs text-center">Spots</p>
        </Link>
        <Link
          href="/posts"
          className="hover:scale-110 transition-all duration-300 flex flex-col items-center"
        >
          <span className="text-7xl">📠</span>
          <p className="text-xs text-center">Blog</p>
        </Link>
      </div>
    </div>
  );
};
