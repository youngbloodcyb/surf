import { DeepPartial } from "ai";
import { z } from "zod";

export const ForecastSchema = z.object({
  location: z.enum(["scripps", "imperial", "oceanside"]),
});

export type Forecast = DeepPartial<z.infer<typeof ForecastSchema>>;
