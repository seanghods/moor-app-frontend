export type CommunityType = {
  _id: string;
  creator: UserType;
  name: string;
  description: string;
  profileImage?: string;
  moderators: Array<string>;
  followers: Array<string>;
  posts: Array<PostType>;
};

export type PostType = {
  _id: string;
  creator: UserType;
  community: CommunityType;
  thumbnail?: string;
  domain?: string;
  title: string;
  type: string;
  voteCount: number;
  link?: string;
  description?: string;
  likes: number;
  discussions: Array<DiscussionType>;
};

export type DiscussionType = {
  _id: string;
  title: string;
  creator: { username: string; id: string };
  comments: Array<CommentType>;
};

export type CommentType = {
  _id: string;
  creator: { username: string; _id: string };
  description: string;
  voteCount: number;
  parentPost: string;
  parentComment?: string;
  children?: CommentType[];
};

export type UserType = {
  _id: string;
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
