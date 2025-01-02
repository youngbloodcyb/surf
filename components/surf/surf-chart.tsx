"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Compass } from "lucide-react";

interface SurfData {
  direction: string;
  height: number;
  period: number;
  water_temperature: number;
}

interface SurfDataByLocation {
  [key: string]: SurfData;
}

function formatLocationName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SurfTable({
  surfData,
}: {
  surfData: SurfDataByLocation;
}) {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead className="text-right">Wave Height (ft)</TableHead>
              <TableHead className="text-right">Period (s)</TableHead>
              <TableHead className="text-right">Water Temp (°F)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(surfData).map(([location, data]) => (
              <TableRow key={location}>
                <TableCell className="font-medium">
                  {formatLocationName(location)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center justify-center rounded-md bg-muted px-2.5 py-0.5 text-sm font-medium">
                    {data.direction}
                  </span>
                </TableCell>
                <TableCell className="text-right">{data.height}</TableCell>
                <TableCell className="text-right">{data.period}</TableCell>
                <TableCell className="text-right">
                  {data.water_temperature}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
