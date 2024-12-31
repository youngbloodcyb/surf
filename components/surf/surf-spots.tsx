"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Coordinates {
  x: number;
  y: number;
}

interface SurfSpot {
  id: number;
  slug: string;
  description: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  coordinates: Coordinates;
  title: string;
}

interface SurfSpotsProps {
  spots: SurfSpot[];
}

// Define rotation sets for each row
const rowRotations = [
  [-7, -3, 4, -5, 6], // First row
  [5, -4, 6, -2, 3], // Second row
  [-6, 4, -3, 5, -4], // Third row
  [3, -5, 2, -6, 4], // Fourth row
];

export const SurfSpots = ({ spots }: SurfSpotsProps) => {
  // Split spots into 4 rows
  const spotsPerRow = Math.ceil(spots.length / 4);
  const rows = Array.from({ length: 4 }, (_, i) =>
    spots.slice(i * spotsPerRow, (i + 1) * spotsPerRow)
  );

  return (
    <div className="flex flex-col gap-4 justify-center items-center not-prose">
      {rows.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex justify-center items-center"
        >
          {row.map((spot, idx) => (
            <motion.div
              key={spot.id}
              style={{
                rotate:
                  rowRotations[rowIndex][idx % rowRotations[rowIndex].length],
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              whileTap={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden relative group"
            >
              <Link href={`/spots/${spot.slug}`}>
                <Image
                  src={spot.image_url}
                  alt={spot.title}
                  width={500}
                  height={500}
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0 transition-all group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-semibold text-center px-2 text-sm md:text-base">
                    {spot.title}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};
