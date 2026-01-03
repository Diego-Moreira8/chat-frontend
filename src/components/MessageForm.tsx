import { useState, useId, useContext } from "react";
import { appFetch } from "../utils/appFetch";
import { UserContext } from "./UserContext";

function MessageForm() {
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
    } catch (error) {
      console.error(error);
    } finally {
      setMessageContent("");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        onChange={(e) => setMessageContent(e.target.value)}
        value={messageContent}
        type="text"
        name="messageContent"
        id={messageContentInputId}
        required
      />

      <button type="submit">Enviar</button>
    </form>
  );
}

export { MessageForm };
