import { Container, Section } from "@/components/craft";
import { Chat } from "./chat";

export default function Page() {
  return (
    <Section>
      <Container>
        <h1 className="text-center">Chat</h1>
        <p className="text-center">
          Chat with the surf forecast and surf spot information.
        </p>
        <Chat />
      </Container>
    </Section>
  );
}
