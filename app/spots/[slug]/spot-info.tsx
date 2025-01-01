import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Camera, Globe, Notebook } from "lucide-react";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Image from "next/image";

export const experimental_ppr = true;

export async function SpotInfo({ slug }: { slug: string }) {
  const spots = (await sql`SELECT * FROM spot WHERE slug = ${slug}`)
    .rows as SurfSpot[];

  if (!spots) {
    return notFound();
  }

  const spot = spots[0];

  const items = [
    {
      title: spot.title,
      header: (
        <div className="relative w-full h-full">
          <Image
            src={spot.image_url}
            fill
            alt={spot.title}
            className="not-prose rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0 transition-all group-hover:blur-sm"
          />
        </div>
      ),
      className: "md:col-span-2",
      icon: <Camera className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Location",
      description: JSON.stringify(spot.coordinates),
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] border bg-gradient-to-r from-green-200 to-blue-500" />
      ),
      className: "md:col-span-1",
      icon: <Globe className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Spot Description",
      description: spot.description,
      className: "md:col-span-3",
      icon: <Notebook className="h-4 w-4 text-neutral-500" />,
    },
  ];
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
