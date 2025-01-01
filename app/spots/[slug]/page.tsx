import { Section, Container } from "@/components/craft";
import { SpotInfo } from "./spot-info";

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
      </Container>
    </Section>
  );
}
