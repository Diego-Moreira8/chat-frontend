import { useContext, useState, useId } from "react";
import { FormInput } from "./FormInput";
import { UserContext } from "./UserContext";
import { Button } from "./Button";

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
    <>
      <h1 className="text-lg font-bold italic">Entrar</h1>

      <form
        className="mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(username, password);
        }}
      >
        <FormInput
          changeHandler={setUsername}
          value={username}
          type="text"
          required={true}
          label="Nome de Usuário"
          id={usernameInputId}
          name="username"
          placeholder="SeuNome123"
        />

        <FormInput
          changeHandler={setPassword}
          value={password}
          type="password"
          required={true}
          label="Senha"
          id={passwordInputId}
          name="password"
        />

        <Button type="submit">Entrar</Button>
      </form>
    </>
  );
}

export { LoginForm };
