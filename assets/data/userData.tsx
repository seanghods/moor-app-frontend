import { PostType, CommentType } from "./postsData";
import { CommunityType } from "./communityData";

export type UserType = {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  bio?: string;
  posts?: PostType[];
  comments?: CommentType[];
  communitiesFollowed?: CommunityType[];
  usersFollowing?: UserType[];
  usersFollowed?: UserType[];
  createdAt?: string;
  updatedAt?: string;
  verified?: boolean;
  emailVerificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
};

export const users = [
  {
    id: "1",
    username: "xavier",
    email: "xavier33@gmail.com",
    profileImage:
      "https://simpleleadership.io/wp-content/uploads/2017/11/traviskimmel-600.jpg",
    bio: "I'm a software engineer who loves to code and build things.",
  },
];
