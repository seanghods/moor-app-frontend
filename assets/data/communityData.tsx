export type CommunityType = {
  id: string;
  // creator: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  moderators: Array<number>;
  followers: Array<number>;
  posts: Array<number>;
};

const communities: Array<CommunityType> = [
  {
    id: "iojaeri23",
    title: "Computers",
    description: "Everything about computers!",
    moderators: [],
    followers: [],
    posts: [],
  },
  {
    id: "fdg342",
    title: "Nature",
    description: "Nature is scary!",
    moderators: [],
    followers: [],
    posts: [],
  },
  {
    id: "xxzxxz2",
    title: "Learning",
    description: "Learning about learning.",
    moderators: [],
    followers: [],
    posts: [],
  },
  {
    id: "mfkldmkmlk23",
    title: "Cooking",
    description: "Cooking amazing food.",
    moderators: [],
    followers: [],
    posts: [],
  },
  {
    id: "vdvdv33",
    title: "Art",
    description: "We love art.",
    moderators: [],
    followers: [],
    posts: [],
  },
  {
    id: "sdgsdgf34",
    title: "Fitness",
    description: "Let's get fit!",
    moderators: [],
    followers: [],
    posts: [],
  },
];
export default communities;
