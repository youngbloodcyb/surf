import { Section, Container } from "@/components/craft";
import { SpotInfo } from "./spot-info";
import { CommentSection } from "./comment-section";
import { Suspense } from "react";
import { CommentFallback } from "./comment-fallback";

export const experimental_ppr = true;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <Section>
      <Container>
        <SpotInfo slug={slug} />
        <Suspense fallback={<CommentFallback />}>
          <CommentSection slug={slug} />
        </Suspense>
      </Container>
    </Section>
  );
}
