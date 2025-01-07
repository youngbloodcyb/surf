"use server";

import { Post } from "@/lib/types/wordpress";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function getNews() {
  try {
    const response = await fetch(
      "https://www.surfline.com/wp-json/wp/v2/posts",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          priority: "u=0, i",
          "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
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

    revalidatePath("/news");
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
