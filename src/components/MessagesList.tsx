import type { Message } from "./Messages";

function MessagesList({ messages }: { messages: Message[] }) {
  return (
    <ul className="flex flex-col gap-2 overflow-auto">
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
