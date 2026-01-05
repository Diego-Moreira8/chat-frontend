import { useState, useId, useContext } from "react";
import { appFetch } from "../utils/appFetch";
import { UserContext } from "./UserContext";

interface MessageFormProps {
  refreshMessages: () => Promise<void>;
}

function MessageForm({ refreshMessages }: MessageFormProps) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData } = userContext;

  const [messageContent, setMessageContent] = useState("");
  const messageContentInputId = useId();

  async function handleSubmit() {
    try {
      const response = await appFetch("/messages", {
        method: "POST",
        accessToken: userData?.accessToken,
        body: { messageContent },
      });

      if (!response.ok) throw new Error("Error at sending message");

      setMessageContent("");
      await refreshMessages();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className="flex gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        className="grow rounded-full border px-4 py-1 placeholder:italic"
        onChange={(e) => setMessageContent(e.target.value)}
        value={messageContent}
        placeholder="Digite uma mensagem"
        type="text"
        name="messageContent"
        id={messageContentInputId}
        required
      />

      <button
        className="rounded-full bg-green-900 px-4 py-1 text-white"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}

export { MessageForm };
