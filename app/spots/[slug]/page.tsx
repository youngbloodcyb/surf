import { Section, Container } from "@/components/craft";
import { SpotInfo } from "./spot-info";

export default async function Page() {
  return (
    <Section>
      <Container>
        <SpotInfo />
      </Container>
    </Section>
  );
}
