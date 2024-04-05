import { posts } from "@/assets/data/postsData";
import PostFeed from "@/src/components/PostFeed";
import { useEffect } from "react";

const Trending = () => {
  useEffect(() => {
    //fetch posts
  }, []);
  return <PostFeed showCommunity={true} posts={posts} />;
};

export default Trending;
