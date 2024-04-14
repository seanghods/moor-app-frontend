import { PostType, CommentType } from "./postsData";
import { CommunityType } from "./communityData";

export type UserType = {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  coverImage?: string;
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
    username: "treta",
    email: "xavier33@gmail.com",
    profileImage:
      "https://simpleleadership.io/wp-content/uploads/2017/11/traviskimmel-600.jpg",
    coverImage:
      "https://i.pinimg.com/originals/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg",
    bio: "I'm a software engineer who loves to code and build things.",
  },
];
