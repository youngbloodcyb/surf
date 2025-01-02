import { Container, Section } from "@/components/craft";
import { getNewsFromDb } from "@/lib/actions/news";

export default async function Page() {
  const news = await getNewsFromDb();
  return (
    <Section>
      <Container>
        <h1 className="text-center font-serif font-bold md:text-5xl">News</h1>
        <p className="text-center text-muted-foreground">
          Surf news from around the world (actually just Surfline...).
        </p>
        <div className="flex flex-col gap-4 mt-6 mx-auto max-w-2xl">
          {news.map((n) => (
            <div key={n.id} className="flex justify-between items-center">
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                dangerouslySetInnerHTML={{ __html: n.title }}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground ml-4">
                {new Date(n.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
