"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { z } from "zod";
import { nanoid } from "nanoid";
import { generateObject, generateText } from "ai";
import { ForecastSchema } from "@/lib/schema/forecast";
import { ForecastChart } from "@/components/surf/forecast-chart";
import { CurrentConditionsSchema } from "@/lib/schema/current";
import { CurrentConditions } from "@/components/surf/current-conditions";
import { headers } from "next/headers";
import { Skeleton } from "@/components/ui/skeleton";
import SurfTable from "@/components/surf/surf-chart";

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

  const headersList = await headers();
  const host = headersList.get("host");

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content:
          "You are a helpful surf assistant. Provide natural responses without using markdown formatting. Keep responses conversational and concise.",
      },
      ...history.get(),
      { role: "user", content: input },
    ],
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
          yield <Skeleton className="w-96 h-72" />;

          const parsedLocation = await generateObject({
            model: openai("gpt-4o"),
            schema: ForecastSchema,
            prompt: `The user has asked for a forecast for ${location}. Please return a proper location name.`,
          });

          const forecast = await fetch(
            process.env.NODE_ENV === "development"
              ? `http://127.0.0.1:5328/api/p/forecast/${parsedLocation.object.location}`
              : `https://${host}/api/p/forecast/${parsedLocation.object.location}`
          );
          const json = await forecast.json();

          const prediction = await generateText({
            model: openai("gpt-4o"),
            prompt: `Based on these surf conditions: ${JSON.stringify(
              json
            )} and the user's question: ${input}, please provide more context or answer questions about the surf conditions. Don't return markdown. Keep it short and concise.`,
          });

          return (
            <div className="max-w-96">
              <ForecastChart data={json} />
              <div className="rounded-lg py-2 px-4">
                <p className="text-xs text-muted-foreground">
                  {prediction.text}
                </p>
              </div>
            </div>
          );
        },
      },
      currentConditions: {
        description: "Get the current surf conditions for a specific location.",
        parameters: CurrentConditionsSchema,
        generate: async function* ({ location }) {
          yield <Skeleton className="w-96 h-72" />;

          const parsedLocation = await generateObject({
            model: openai("gpt-4o"),
            schema: CurrentConditionsSchema,
            prompt: `The user has asked for the current surf conditions for ${location}. Please return a proper location name.`,
          });

          const currentConditions = await fetch(
            process.env.NODE_ENV === "development"
              ? `http://127.0.0.1:5328/api/p/current/${parsedLocation.object.location}`
              : `https://${host}/api/p/current/${parsedLocation.object.location}`
          );
          const json = await currentConditions.json();

          const prediction = await generateText({
            model: openai("gpt-4o"),
            prompt: `Based on these surf conditions: ${JSON.stringify(
              json
            )} and the user's question: ${input}, please provide more context or answer questions about the surf conditions. Don't return markdown. Keep it short and concise.`,
          });

          return (
            <div className="max-w-96">
              <CurrentConditions data={json} />
              <div className="rounded-lg py-2 px-4">
                <p className="text-xs text-muted-foreground">
                  {prediction.text}
                </p>
              </div>
            </div>
          );
        },
      },
      allConditions: {
        parameters: z.object({}),
        description:
          "Get the current surf conditions for all locations to show or compare.",
        generate: async function* () {
          yield <Skeleton className="w-96 h-72" />;

          const currentConditions = await fetch(
            process.env.NODE_ENV === "development"
              ? `http://127.0.0.1:5328/api/p/all`
              : `https://${host}/api/p/all`
          );
          const json = await currentConditions.json();

          const prediction = await generateText({
            model: openai("gpt-4o"),
            prompt: `Based on these surf conditions: ${JSON.stringify(
              json
            )} and the user's question: ${input}, please provide more context or answer questions about the surf conditions. Please do not return markdown. Keep it short and concise.`,
          });

          return (
            <div className="max-w-96">
              <SurfTable surfData={json} />
              <div className="rounded-lg py-2 px-4">
                <p className="text-xs text-muted-foreground">
                  {prediction.text}
                </p>
              </div>
            </div>
          );
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
