import { useEffect, useRef } from "react";
import type { Message } from "./Messages";

function MessagesList({ messages }: { messages: Message[] }) {
  const messagesListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const msgsListRef = messagesListRef.current;
    if (!msgsListRef) return;
    msgsListRef.scrollTo(0, msgsListRef.scrollHeight);
  }, [messages]);

  return (
    <ul className="flex flex-col gap-2 overflow-auto" ref={messagesListRef}>
      {messages.map(({ message, user }) => {
        const createdAt = new Date(message.createdAt).toLocaleString();

        return (
          <li className="rounded bg-blue-300 p-1 text-black" key={message.id}>
            <p className="text-xs italic">
              {user.name || user.username} em {createdAt}
            </p>
            <p className="break-all">{message.content}</p>
          </li>
        );
      })}
    </ul>
  );
}

export { MessagesList };
