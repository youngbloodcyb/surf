import { Skeleton } from "@/components/ui/skeleton";

export const CommentFallback = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-4">
      <Skeleton className="rounded-xl p-4 md:col-span-3" />
      <Skeleton className="rounded-xl p-4 md:col-span-1" />
    </div>
  );
};
