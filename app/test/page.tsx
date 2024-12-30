"use client";

import { useState } from "react";
import { ClientMessage } from "@/lib/actions/chat";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Waves, CalendarDays, Send, Sparkles } from "lucide-react";

const DEFAULT_PROMPTS = [
  {
    icon: <CalendarDays className="h-6 w-6" />,
    title: "14 day forecast",
    prompt: "What is the 14 day forecast for the surf at Scripps?",
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: "Current conditions",
    prompt: "What are the current conditions for the surf in Encinitas?",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Suggest a surf spot",
    prompt: "What is a good surf spot for beginners right now?",
  },
];

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  const handleSubmit = async (text: string) => {
    setInput("");
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: text },
    ]);

    const message = await continueConversation(text);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="container max-w-4xl py-10">
        <div>
          <div className="rounded-lg border bg-background p-6 space-y-6">
            <h1 className="text-4xl font-bold text-center">Surf Chat</h1>
            <div className="space-y-4 min-h-[300px]">
              {conversation.length === 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {DEFAULT_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubmit(prompt.prompt)}
                      className="group relative rounded-lg border p-6 hover:bg-muted transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {prompt.icon}
                        </div>
                        <div className="font-medium">{prompt.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {prompt.prompt}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                conversation.map((message: ClientMessage) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.display}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask about the waves..."
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
