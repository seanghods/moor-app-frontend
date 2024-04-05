import React, { createContext, ReactNode, useContext, useState } from "react";
import { PostType } from "@/assets/data/postsData";

interface PostState {
  currentPost: PostType | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}

// Create a context with an undefined initial state
const PostContext = createContext<PostState | undefined>(undefined);

// Define the props for your provider component
interface PostProviderProps {
  children: ReactNode;
}

// Create a provider component
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [currentPost, setCurrentPost] = useState<PostType | null>(null); // Initialize user state as null or from a persisted state

  return (
    <PostContext.Provider value={{ currentPost, setCurrentPost }}>
      {children}
    </PostContext.Provider>
  );
};

// Create a custom hook for using the user context
export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}
