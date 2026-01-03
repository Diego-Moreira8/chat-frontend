import { useContext } from "react";
import { LoginForm } from "./components/LoginForm";
import { Messages } from "./components/Messages";
import { Nav } from "./components/Nav";
import { RegisterForm } from "./components/RegisterForm";
import { UserContext } from "./components/UserContext";

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
        <Messages />
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
