import { getNews } from "@/lib/actions/news";

export async function GET() {
  const news = await getNews();
  return Response.json(news);
}
