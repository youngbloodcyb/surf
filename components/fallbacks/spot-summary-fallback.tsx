"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

// Use the same rotation values for consistency
const rotations = [-7, -3, 4, -5, 6];

export const SpotSummaryFallback = () => {
  return (
    <div className="flex justify-center items-center not-prose">
      {[...Array(5)].map((_, idx) => (
        <motion.div
          key={idx}
          style={{
            rotate: rotations[idx],
          }}
          className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
        >
          <Skeleton className="h-20 w-20 md:h-40 md:w-40 rounded-lg animate-pulse" />
        </motion.div>
      ))}
    </div>
  );
};
