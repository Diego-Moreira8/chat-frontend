import type { Message } from "./Messages";

function MessagesList({ messages }: { messages: Message[] }) {
  return (
    <ul>
      {messages.map(({ message, user }) => {
        const createdAt = new Date(message.createdAt).toLocaleString();

        return (
          <li key={message.id}>
            <div>
              {user.name || user.username} em {createdAt}
            </div>
            <p>{message.content}</p>
          </li>
        );
      })}
    </ul>
  );
}

export { MessagesList };
