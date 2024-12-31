"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Thermometer, Clock3 } from "lucide-react";

interface SurfData {
  direction: string;
  height: number;
  period: number;
  water_temperature: number;
}

export function CurrentConditions({ data }: { data: SurfData }) {
  // Convert direction to degrees for the compass
  const getDirectionDegrees = (direction: string) => {
    const directions: { [key: string]: number } = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5,
    };
    return directions[direction] || 0;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Current Surf Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          {/* Compass Direction */}
          <Card className="col-span-1">
            <CardContent className="p-6">
              <div className="relative w-32 h-32 mx-auto">
                {/* Compass circle */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-300" />

                {/* Direction pointer */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotate(${getDirectionDegrees(
                      data.direction
                    )}deg)`,
                  }}
                >
                  <div className="w-1 h-16 absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom bg-muted-foreground" />
                  <div className="w-2 h-2 bg-muted-foreground absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
                </div>

                {/* Direction text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{data.direction}</span>
                </div>

                {/* Cardinal points */}
                {["N", "E", "S", "W"].map((direction, index) => (
                  <div
                    key={direction}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    style={{
                      transform: `rotate(${index * 90}deg)`,
                    }}
                  >
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-semibold">
                      {direction}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wave Height */}
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Waves className="w-8 h-8 text-blue-600" />
                <div className="relative w-full h-24 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-800 dark:to-blue-900 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-500/50 transition-all duration-1000 ease-in-out"
                    style={{
                      height: `${(data.height / 6) * 100}%`,
                      animation: "wave 2s infinite ease-in-out",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {data.height}ft
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Period */}
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Clock3 className="w-8 h-8 text-blue-600" />
                <div className="relative w-full">
                  <div className="text-center">
                    <span className="text-2xl font-bold">{data.period}s</span>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Period
                    </p>
                  </div>
                  <div className="mt-2 flex justify-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        style={{
                          animation: `pulse 2s ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Water Temperature */}
          <Card className="col-span-1 bg-white/80 dark:bg-gray-800/80">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Thermometer className="w-8 h-8 text-blue-600" />
                <div className="text-center">
                  <span className="text-2xl font-bold">
                    {data.water_temperature}°F
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Water Temperature
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
