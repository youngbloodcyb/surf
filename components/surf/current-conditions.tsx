"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Waves, Thermometer, Clock3, Compass } from "lucide-react";
import { motion } from "framer-motion";

const rotations = [-3, 3, -4, 5];

export function CurrentConditions({ data }: { data: SurfData }) {
  return (
    <Card className="max-w-96 bg-transparent border-none shadow-none p-4">
      <CardContent className="grid grid-cols-2 gap-2">
        {/* Compass Direction */}
        <motion.div
          style={{ rotate: rotations[0] }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          className="-mr-1"
        >
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Compass className="w-8 h-8 text-blue-600" />
                <div className="relative w-full">
                  <div className="text-center">
                    <span className="text-xl font-bold">{data.direction}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Wave Direction
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Wave Height */}
        <motion.div
          style={{ rotate: rotations[1] }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          className="-ml-1"
        >
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Waves className="w-8 h-8 text-blue-600" />
                <div className="relative w-full">
                  <div className="text-center">
                    <span className="text-xl font-bold">{data.height}ft</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Wave Height
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Period */}
        <motion.div
          style={{ rotate: rotations[2] }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          className="-mr-1 -mt-1"
        >
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Clock3 className="w-8 h-8 text-blue-600" />
                <div className="relative w-full">
                  <div className="text-center">
                    <span className="text-xl font-bold">{data.period}s</span>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Period
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Water Temperature */}
        <motion.div
          style={{ rotate: rotations[3] }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          className="-ml-1 -mt-1"
        >
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Thermometer className="w-8 h-8 text-blue-600" />
                <div className="text-center">
                  <span className="text-xl font-bold">
                    {data.water_temperature}°F
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Water Temp
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </CardContent>
    </Card>
  );
}
