import { useContext, useState, useId } from "react";
import { UserContext } from "./UserContext";
import { appFetch } from "../utils/appFetch";

function RegisterForm() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { handleLogin } = userContext;

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const usernameInputId = useId();
  const fullNameInputId = useId();
  const passwordInputId = useId();
  const pwConfirmationInputId = useId();

  async function handleRegistration() {
    try {
      const response = await appFetch("/users", {
        method: "POST",
        body: {
          username,
          name: fullName,
          password,
          passwordConfirmation,
        },
      });

      if (!response.ok) throw new Error("Error at registration");

      await handleLogin(username, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegistration();
      }}
    >
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        id={usernameInputId}
        name="username"
        placeholder="Usuário"
        required
      />

      <input
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        type="text"
        id={fullNameInputId}
        name="fullName"
        placeholder="Nome Completo"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        id={passwordInputId}
        name="password"
        placeholder="Senha"
        required
      />

      <input
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        value={passwordConfirmation}
        type="password"
        id={pwConfirmationInputId}
        name="passwordConfirmation"
        placeholder="Confirme a senha"
        required
      />

      <button type="submit">Criar Conta</button>
    </form>
  );
}

export { RegisterForm };
