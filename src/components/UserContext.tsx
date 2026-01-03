import { createContext, useEffect, useState, type ReactNode } from "react";
import { appFetch } from "../utils/appFetch";

interface User {
  username: string;
  name: string;
  role: "ADMIN" | "USER";
  accessToken: string;
}

function useUser() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const tokenStored = localStorage.getItem("accessToken");
      if (!tokenStored) return handleLogOut();

      const response = await appFetch("/users/me", {
        accessToken: tokenStored,
      });

      if (response.status === 401) return handleLogOut();

      if (!response.ok) throw new Error("Failed to authenticate");

      const data = await response.json();

      const userData: User = { ...data.user, accessToken: tokenStored };

      setUserData(userData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogin(username: string, password: string) {
    try {
      const response = await appFetch("/users/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });

      if (!response.ok) throw new Error("Error at login");

      const data = await response.json();

      const token = data.token;

      localStorage.setItem("accessToken", token);

      await checkAuthentication();
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogOut() {
    localStorage.removeItem("accessToken");
    setUserData(null);
  }

  return { userData, handleLogin, handleLogOut };
}

const UserContext = createContext<ReturnType<typeof useUser> | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const { userData, handleLogin, handleLogOut } = useUser();
  return (
    <UserContext value={{ userData, handleLogin, handleLogOut }}>
      {children}
    </UserContext>
  );
}

export { UserContext, UserProvider };
