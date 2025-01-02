"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// Use fixed rotation values instead of random
const rotations = [-7, -3, 4, -5, 6];

export const SurfSpots = ({ spots }: SurfSpotsProps) => {
  return (
    <div className="flex justify-center items-center not-prose">
      {spots.slice(0, 5).map((spot, idx) => (
        <motion.div
          key={spot.id}
          style={{
            rotate: rotations[idx],
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 flex-shrink-0 overflow-hidden relative group"
        >
          <Link href={`/spots/${spot.slug}`}>
            <Image
              src={spot.image_url}
              alt={spot.title}
              width={500}
              height={500}
              className="rounded-lg h-16 w-16 md:h-40 md:w-40 object-cover flex-shrink-0 transition-all group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-semibold text-center px-2 text-xs md:text-base">
                {spot.title}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
