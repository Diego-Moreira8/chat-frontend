import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

function LoginForm() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { handleLogin } = userContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(username, password);
      }}
    >
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export { LoginForm };
