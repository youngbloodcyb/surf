// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import { sql } from "@vercel/postgres";

// Components
import Link from "next/link";

// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";

import { SurfSpots } from "@/components/surf/spots-summary";

// This page is using the craft.tsx component and design system
export default async function Home() {
  const spots = (await sql`SELECT * FROM spot LIMIT 5`).rows as SurfSpot[];
  return (
    <Section>
      <Container>
        <Content />
        <SurfSpots spots={spots} />
      </Container>
    </Section>
  );
}

// This is just some example JS to demonstrate automatic styling from brijr/craft
const Content = () => {
  return (
    <article className="prose-m-none">
      <h1>
        <Balancer>
          Hello World, welcome to the Next.js and WordPress Starter by{" "}
          <a href="https://9d8.dev">9d8</a>.
        </Balancer>
      </h1>
      <div className="grid md:grid-cols-3 gap-4 mt-6 not-prose">
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts"
        >
          <Pen size={32} />
          <span>
            Posts{" "}
            <span className="block text-sm text-muted-foreground">
              All posts from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/pages"
        >
          <File size={32} />
          <span>
            Pages{" "}
            <span className="block text-sm text-muted-foreground">
              Custom pages from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/authors"
        >
          <User size={32} />
          <span>
            Authors{" "}
            <span className="block text-sm text-muted-foreground">
              List of the authors from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/tags"
        >
          <Tag size={32} />
          <span>
            Tags{" "}
            <span className="block text-sm text-muted-foreground">
              Content by tags from your WordPress
            </span>
          </span>
        </Link>
        <Link
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="/posts/categories"
        >
          <Boxes size={32} />
          <span>
            Categories{" "}
            <span className="block text-sm text-muted-foreground">
              Categories from your WordPress
            </span>
          </span>
        </Link>
        <a
          className="border h-48 bg-accent/50 rounded-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-all"
          href="https://github.com/9d8dev/next-wp"
        >
          <Folder size={32} />
          <span>
            Documentation{" "}
            <span className="block text-sm text-muted-foreground">
              How to use `next-wp`
            </span>
          </span>
        </a>
      </div>
    </article>
  );
};
