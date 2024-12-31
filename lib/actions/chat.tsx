"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { generateObject } from "ai";
import { ForecastSchema } from "@/lib/schema/forecast";
import { ForecastChart } from "@/components/surf/forecast-chart";
import { CurrentConditionsSchema } from "@/lib/schema/current";
import { CurrentConditions } from "@/components/surf/current-conditions";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-4o"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      forecast: {
        description: "Get a forecast for a specific location.",
        parameters: ForecastSchema,
        generate: async function* ({ location }) {
          yield <div>Loading forecast...</div>;

          const parsedLocation = await generateObject({
            model: openai("gpt-4o"),
            schema: ForecastSchema,
            prompt: `The user has asked for a forecast for ${location}. Please return a proper location name.`,
          });

          const forecast = await fetch(
            `http://127.0.0.1:5328/api/p/forecast/${parsedLocation.object.location}`
          );
          const json = await forecast.json();

          return <ForecastChart data={json} />;
        },
      },
      currentConditions: {
        description: "Get the current surf conditions for a specific location.",
        parameters: CurrentConditionsSchema,
        generate: async function* ({ location }) {
          yield <div>Loading current conditions...</div>;

          const parsedLocation = await generateObject({
            model: openai("gpt-4o"),
            schema: CurrentConditionsSchema,
            prompt: `The user has asked for the current surf conditions for ${location}. Please return a proper location name.`,
          });

          const currentConditions = await fetch(
            `http://127.0.0.1:5328/api/p/current/${parsedLocation.object.location}`
          );
          const json = await currentConditions.json();

          return <CurrentConditions data={json} />;
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
