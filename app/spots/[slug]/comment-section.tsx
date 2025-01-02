import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Notebook } from "lucide-react";
import { SendHorizonal } from "lucide-react";

export async function CommentSection({ slug }: { slug: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-4">
      <div className="border rounded-xl p-4 md:col-span-3">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <Notebook className="h-4 w-4 text-neutral-500" />
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            Comments
          </div>
          <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
            aslkdfjs
          </div>
        </div>
      </div>
      <div className="border rounded-xl p-4 md:col-span-1">
        <form action="" className="flex flex-col h-full">
          <Textarea
            placeholder="Add a comment"
            className="flex-1 min-h-32 mb-2 resize-none"
          />
          <Button className="inline-flex items-center justify-center gap-2">
            Post Comment
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
