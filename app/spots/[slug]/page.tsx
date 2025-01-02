import { Section, Container } from "@/components/craft";
import { SpotInfo } from "./spot-info";
import { CommentSection } from "./comment-section";

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
        <CommentSection slug={slug} />
      </Container>
    </Section>
  );
}
