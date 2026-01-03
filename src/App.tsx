import { useContext } from "react";
import { Messages } from "./components/Messages";
import { Header } from "./components/Nav";
import { UserContext } from "./components/UserContext";
import { SignIn } from "./components/SignIn";

function App() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData } = userContext;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4">{userData ? <Messages /> : <SignIn />}</main>
    </div>
  );
}

export { App };
