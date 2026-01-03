import { useContext } from "react";
import { UserContext } from "./UserContext";

function Nav() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }
  const { userData, handleLogOut } = userContext;

  return (
    <header>
      <b>Chat</b>

      {userData && (
        <>
          <span>Olá, {userData.name || userData.username}</span>
          <button onClick={handleLogOut} type="button">
            Sair
          </button>
        </>
      )}
    </header>
  );
}

export { Nav };
