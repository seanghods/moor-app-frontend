import { UserType } from "@/src/api-types/api-types";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(API_ROUTES.checkSession, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.user); // Set the user state with the retrieved session dataa
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
