import { Section, Container } from "@/components/craft";
import { SurfSpots } from "@/components/surf/surf-spots";
import { sql } from "@vercel/postgres";

export default async function Page() {
  const spots = (await sql`SELECT * FROM spot`).rows as SurfSpot[];

  return (
    <Section>
      <Container>
        <h1 className="text-center">Surf Spots</h1>
        <p className="text-center">
          A collection of surf spots from around the world.
        </p>
        <SurfSpots spots={spots} />
      </Container>
    </Section>
  );
}
