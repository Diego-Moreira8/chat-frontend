import { createContext, useState, type ReactNode } from "react";
import { appFetch } from "../utils/appFetch";

interface User {
  username: string;
  name: string;
  role: "ADMIN" | "USER";
  accessToken: string;
}

function useUser() {
  const ACCESS_TOKEN = "accessToken";
  const [userData, setUserData] = useState<User | null | undefined>(undefined);

  async function validateAccessToken() {
    try {
      const storedToken = localStorage.getItem(ACCESS_TOKEN);
      if (!storedToken) {
        handleLogOut();
        return;
      }

      const response = await appFetch("/users/me", {
        accessToken: storedToken,
      });

      if (response.status === 401) {
        handleLogOut();
        return;
      }

      if (!response.ok) throw new Error("Failed to authenticate");

      const data = await response.json();

      const userData: User = { ...data.user, accessToken: storedToken };

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

      localStorage.setItem(ACCESS_TOKEN, token);

      await validateAccessToken();
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    setUserData(null);
  }

  return {
    userData,
    validateAccessToken,
    handleLogin,
    handleLogOut,
  };
}

const UserContext = createContext<ReturnType<typeof useUser> | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const { userData, validateAccessToken, handleLogin, handleLogOut } =
    useUser();
  return (
    <UserContext
      value={{ userData, validateAccessToken, handleLogin, handleLogOut }}
    >
      {children}
    </UserContext>
  );
}

export { UserContext, UserProvider };
