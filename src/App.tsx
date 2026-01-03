import { useContext } from "react";
import { LoginForm } from "./components/LoginForm";
import { Nav } from "./components/Nav";
import { RegisterForm } from "./components/RegisterForm";
import { UserContext } from "./components/UserContext";
import { MessageForm } from "./components/MessageForm";

function App() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData } = userContext;

  return (
    <>
      <Nav />
      {userData ? (
        <MessageForm />
      ) : (
        <>
          <hr />
          <br />
          <LoginForm />
          <br />
          <hr />
          <br />
          <RegisterForm />
        </>
      )}
    </>
  );
}

export { App };
