"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  height: {
    label: "Tide Height",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ForecastChart({ data }: { data: TideData[] }) {
  return (
    <Card className="w-64 md:w-full h-72">
      <CardHeader>
        <CardTitle className="sr-only">Wave Forecast</CardTitle>
        <CardDescription className="sr-only">
          Showing wave heights over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="height"
              type="natural"
              fill="var(--color-height)"
              fillOpacity={0.4}
              stroke="var(--color-height)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2 text-sm justify-center">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground text-center w-full text-xs">
              {new Date(data[0].time).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              through{" "}
              {new Date(data[data.length - 1].time).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" }
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
