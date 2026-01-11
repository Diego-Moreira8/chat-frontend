import { useContext, useEffect, useState } from "react";
import { appFetch } from "../utils/appFetch";
import { UserContext } from "./UserContext";
import { MessageForm } from "./MessageForm";
import { MessagesList } from "./MessagesList";

interface Message {
  message: {
    id: number;
    content: string;
    createdAt: string;
  };
  user: {
    name: string;
    username: string;
  };
}

function Messages() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData } = userContext;

  const [messages, setMessages] = useState<Message[]>([]);

  async function refreshMessages() {
    try {
      const response = await appFetch("/messages", {
        accessToken: userData?.accessToken,
      });

      if (!response.ok) throw new Error("Error at fetching all messages");

      const data = await response.json();

      setMessages(data.allMessagesData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refreshMessages();
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <MessagesList messages={messages} />
      <MessageForm refreshMessages={refreshMessages} />
    </div>
  );
}

export { Messages };
export type { Message };
