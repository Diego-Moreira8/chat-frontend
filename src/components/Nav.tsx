import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function Header() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { userData, handleLogOut } = userContext;
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!userData) return;

    const encodedPayload = userData.accessToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(encodedPayload));
    const expInMs = decodedPayload.exp * 1000;

    function updateCountdown() {
      const diff = expInMs - Date.now();

      if (diff <= 0) {
        setTimeLeft(0);
        return;
      }

      setTimeLeft(Math.floor(diff / 1000));
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [userData]);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${String(secs).padStart(2, "0")}`;
  }

  return (
    <header className="bg-gray-800 px-4 py-2 text-white">
      <span className="text-lg font-bold italic">Chat</span>

      {userData && (
        <>
          <span>Olá, {userData.name || userData.username}</span>

          {timeLeft !== null && (
            <span>
              Sessão expira em {timeLeft > 0 ? formatTime(timeLeft) : "0:00"}
            </span>
          )}

          <button onClick={handleLogOut} type="button">
            Sair
          </button>
        </>
      )}
    </header>
  );
}

export { Header };
