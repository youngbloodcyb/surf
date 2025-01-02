import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Notebook } from "lucide-react";
import { SendHorizonal } from "lucide-react";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function CommentSection({ slug }: { slug: string }) {
  const comments = await sql`
    SELECT c.* 
    FROM comment c
    JOIN spot s ON s.id = c.spot_id
    WHERE s.slug = ${slug}
    ORDER BY c.created_at DESC
    LIMIT 5
  `;

  async function createComment(formData: FormData) {
    "use server";

    const comment = formData.get("comment");
    if (!comment || typeof comment !== "string") return;

    const spot = await sql`SELECT id FROM spot WHERE slug = ${slug}`;
    if (!spot.rows.length) return;

    await sql`
      INSERT INTO comment (spot_id, text, author) 
      VALUES (${spot.rows[0].id}, ${comment}, 'anonymous')
    `;
    revalidatePath(`/spots/${slug}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-4">
      <div className="border rounded-xl p-4 md:col-span-3">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <Notebook className="h-4 w-4 text-muted-foreground" />
          <div className="font-sans font-bold text-muted-foreground mb-2 mt-2">
            Comments
          </div>
          {comments.rows.map((comment) => (
            <div
              key={comment.id}
              className="font-sans font-normal text-muted-foreground text-sm flex justify-between"
            >
              <p>{comment.text.slice(0, 60)}</p>
              <p className="text-xs text-muted-foreground">
                by <span className="underline">{comment.author}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border rounded-xl p-4 md:col-span-1">
        <form action={createComment} className="flex flex-col h-full">
          <Textarea
            name="comment"
            placeholder="Add a comment"
            className="flex-1 min-h-32 mb-2 resize-none"
            required
          />
          <Button
            type="submit"
            className="inline-flex items-center justify-center gap-2"
          >
            Post Comment
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
