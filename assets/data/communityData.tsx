export type CommunityType = {
  id: string;
  // creator: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  profilePic?: string;
  moderators: Array<string>;
  followers: Array<string>;
  posts: Array<string>;
};

const communities: Array<CommunityType> = [
  {
    id: "iojaeri23",
    title: "Computers",
    description: "Everything about computers!",
    profilePic:
      "https://www.megabyte.be/wp-content/uploads/2015/01/dreamstime_3261973.jpg",
    moderators: [],
    followers: ["1"],
    posts: ["24124124sd"],
  },
  {
    id: "fdg342",
    title: "Nature",
    description: "Nature is scary!",
    profilePic:
      "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
    moderators: [],
    followers: ["1"],
    posts: ["39042kjsf", "jifjieojio33"],
  },
  {
    id: "xxzxxz2",
    title: "Learning",
    description: "Learning about learning.",
    profilePic:
      "https://www.socialsciencespace.com/wp-content/uploads/black-teacher.jpg",
    moderators: [],
    followers: ["1"],
    posts: ["dfsdb342"],
  },
  {
    id: "mfkldmkmlk23",
    title: "Cooking",
    description: "Cooking amazing food.",
    profilePic:
      "https://esmmweighless.com/wp-content/uploads/2019/12/Carolyn-Cooking-Blog.jpg",
    moderators: [],
    followers: ["1"],
    posts: ["434g32"],
  },
  {
    id: "vdvdv33",
    title: "Art",
    description: "We love art.",
    profilePic:
      "https://www.thesprucecrafts.com/thmb/TJt0u47H9d6wdajgPvRzW_Ne3sA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-922707682-5b90467bc9e77c0025931eef.jpg",
    moderators: [],
    followers: ["1"],
    posts: ["34234fff"],
  },
  {
    id: "sdgsdgf34",
    title: "Fitness",
    profilePic:
      "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/918931152FitnessProfessional.jpg=ws1280x960",
    description: "Let's get fit!",
    moderators: [],
    followers: ["1"],
    posts: ["2323ff52", "24sda124sd"],
  },
];
export default communities;
