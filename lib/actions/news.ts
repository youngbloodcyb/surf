"use server";

import { Post } from "@/lib/types/wordpress";
import { sql } from "@vercel/postgres";

export async function getNews() {
  try {
    const response = await fetch(
      "https://www.surfline.com/wp-json/wp/v2/posts"
    );
    const posts: Post[] = await response.json();
    const news = posts.slice(0, 10).map((post) => ({
      title: post.title.rendered,
      link: post.link,
    }));

    await sql`DELETE FROM story`;

    for (const { title, link } of news) {
      await sql`INSERT INTO story (title, link) VALUES (${title}, ${link})`;
    }

    return { success: true };
  } catch (error) {
    console.error("Error fetching and saving news posts:", error);
    return { success: false };
  }
}

export async function getNewsFromDb() {
  const news = await sql`SELECT * FROM story`;
  if (news.rows.length === 0) {
    return [];
  }
  return news.rows;
}
