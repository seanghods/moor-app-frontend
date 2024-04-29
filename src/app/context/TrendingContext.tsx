import { PostType } from "@/src/api-types/api-types";
import { API_ROUTES } from "@/src/utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TrendingState {
  trendingPosts: PostType[] | null;
  setTrendingPosts: React.Dispatch<React.SetStateAction<PostType[] | null>>;
}

// Create a context with an undefined initial state
const TrendingContext = createContext<TrendingState | undefined>(undefined);

// Define the props for your provider component
interface TrendingProviderProps {
  children: ReactNode;
}

// Create a provider component
export const TrendingProvider: React.FC<TrendingProviderProps> = ({
  children,
}) => {
  const [trendingPosts, setTrendingPosts] = useState<PostType[] | null>(null);
  useEffect(() => {
    async function getTrending() {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(API_ROUTES.trending, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTrendingPosts(data);
    }
    getTrending();
  }, []);

  return (
    <TrendingContext.Provider value={{ trendingPosts, setTrendingPosts }}>
      {children}
    </TrendingContext.Provider>
  );
};

// Create a custom hook for using the user context
export function useTrending() {
  const context = useContext(TrendingContext);
  if (context === undefined) {
    throw new Error("useTrending must be used within Trending Provider");
  }
  return context;
}
