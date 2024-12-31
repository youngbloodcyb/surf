import { DeepPartial } from "ai";
import { z } from "zod";

export const CurrentConditionsSchema = z.object({
  location: z.enum([
    "scripps",
    "imperial",
    "encinitas",
    "del_mar",
    "torrey_pines",
  ]),
});

export type CurrentConditions = DeepPartial<
  z.infer<typeof CurrentConditionsSchema>
>;
