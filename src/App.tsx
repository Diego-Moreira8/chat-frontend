import { useContext, useEffect } from "react";
import { Messages } from "./components/Messages";
import { Header } from "./components/Nav";
import { UserContext } from "./components/UserContext";
import { SignIn } from "./components/SignIn";

function App() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData, validateAccessToken } = userContext;

  useEffect(() => {
    validateAccessToken();
  }, []);

  return (
    <div className="min-h-dvh overflow-hidden">
      <Header />
      {userData === undefined ? (
        <p className="p-4 text-center italic">Carregando...</p>
      ) : (
        <main className="h-[calc(100dvh-var(--spacing-header-height))] p-4">
          {userData ? <Messages /> : <SignIn />}
        </main>
      )}
    </div>
  );
}

export { App };
