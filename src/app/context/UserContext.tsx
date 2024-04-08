import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { users, UserType } from "@/assets/data/userData";

interface UserState {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// Create a context with an undefined initial state
const UserContext = createContext<UserState | undefined>(undefined);

// Define the props for your provider component
interface UserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const initializeUserSession = async () => {
      setUser(users[0]);
      // const sessionUser = await fetchUserSession(); // Fetch user session from storage or API
      // setUser(sessionUser); // Set the user state with the retrieved session data
    };

    initializeUserSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
