import { useContext, useState, useId } from "react";
import { FormInput } from "./FormInput";
import { UserContext } from "./UserContext";
import { appFetch } from "../utils/appFetch";
import { Button } from "./Button";

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
    <>
      <h1 className="text-lg font-bold italic">Criar Conta</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistration();
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
          placeholder="Usuário"
        />

        <FormInput
          changeHandler={setFullName}
          value={fullName}
          type="text"
          label="Seu nome"
          id={fullNameInputId}
          name="fullName"
          placeholder="Diego Moreira"
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

        <FormInput
          changeHandler={setPasswordConfirmation}
          value={passwordConfirmation}
          type="password"
          required={true}
          label="Confirme a senha"
          id={pwConfirmationInputId}
          name="passwordConfirmation"
        />

        <Button type="submit">Criar Conta</Button>
      </form>
    </>
  );
}

export { RegisterForm };
