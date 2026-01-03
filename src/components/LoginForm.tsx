import { useContext, useState, useId } from "react";
import { UserContext } from "./UserContext";

function LoginForm() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { handleLogin } = userContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameInputId = useId();
  const passwordInputId = useId();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, password);
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
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        id={passwordInputId}
        name="password"
        placeholder="Senha"
        required
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export { LoginForm };
