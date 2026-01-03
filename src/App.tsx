import { useContext } from "react";
import { Messages } from "./components/Messages";
import { Nav } from "./components/Nav";
import { UserContext } from "./components/UserContext";
import { SignIn } from "./components/SignIn";

function App() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData } = userContext;

  return (
    <>
      <Nav />
      {userData ? <Messages /> : <SignIn />}
    </>
  );
}

export { App };
