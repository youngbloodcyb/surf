export const revalidate = 3600;

import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPosts,
} from "@/lib/actions/wordpress";

import { Section, Container, Article } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title.rendered,
    description: post.excerpt.rendered,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const featuredMedia = await getFeaturedMediaById(post.featured_media);
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></span>
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Published {date} by{" "}
            {author.name && (
              <span>
                <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
              </span>
            )}
          </h5>
          <Link
            href={`/posts/?category=${category.id}`}
            className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
          >
            {category.name}
          </Link>
        </div>
        {featuredMedia?.source_url && (
          <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
            <img
              className="w-full"
              src={featuredMedia.source_url}
              alt={post.title.rendered}
            />
          </div>
        )}
        <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Container>
    </Section>
  );
}
