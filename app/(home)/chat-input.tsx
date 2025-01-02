"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChatInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/chat?prompt=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-96 mx-auto my-6">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about the waves..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!value.trim()}>
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
