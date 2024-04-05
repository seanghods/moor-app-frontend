export type PostType = {
  id: string;
  author: { username: string };
  community: { title: string; id: string };
  thumbnail?: string;
  domain?: string;
  title: string;
  type: string;
  link?: string;
  body?: string;
  likes: number;
  discussions: Array<DiscussionType>;
};

export type DiscussionType = {
  id: string;
  title: string;
  author: { username: string };
  comments: Array<CommentType>;
};

export type CommentType = {
  id: string;
  author: { username: string };
  body: string;
  parentPost: string;
  parentComment?: string;
};

export const posts: Array<PostType> = [
  {
    id: "24124124sd",
    title: "How Computers Work",
    author: { username: "user1" },
    community: { title: "Computers", id: "iojaeri23" },
    thumbnail: "https://i.ytimg.com/vi/7_LPdttKXPc/hqdefault.jpg",
    domain: "www.youtube.com",
    type: "link",
    link: "https://www.youtube.com/watch?v=7_LPdttKXPc",
    body: "This is an interesting video about how the internet is made, pretty cool huh?",
    likes: 5,
    discussions: [
      {
        id: "fdsf23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [
          {
            id: "dfssdf",
            author: { username: "treta" },
            body: "The internet wiring underwater is wild.",
            parentPost: "24124124sd",
          },
          {
            id: "dgs323",
            author: { username: "qddg" },
            body: "From my macbook to this.",
            parentPost: "24124124sd",
          },
          {
            id: "hgfhgij",
            author: { username: "seb" },
            body: "thanks for sharing!",
            parentPost: "24124124sd",
          },
        ],
      },
      {
        id: "ajodf342",
        title: "Questions?",
        author: { username: "user1" },
        comments: [
          {
            id: "ijesot3",
            author: { username: "bobby" },
            body: "I love computers, great post",
            parentPost: "24124124sd",
          },
          {
            id: "dfssdf",
            author: { username: "rick" },
            body: "The internet wiring underwater is wild.",
            parentPost: "24124124sd",
          },
          {
            id: "dgs323",
            author: { username: "mohammed" },
            body: "From my macbook to this.",
            parentPost: "24124124sd",
          },
          {
            id: "hgfhgij",
            author: { username: "seb" },
            body: "thanks for sharing!",
            parentPost: "24124124sd",
          },
        ],
      },
    ],
  },
  {
    id: "24sda124sd",
    title: "My Experience with Jump Rope",
    author: { username: "user1" },
    community: { title: "Fitness", id: "sdgsdgf34" },
    type: "text",
    body: "There are a lot of ways to work out these days. Boot camps, workout classes, yoga. This is why learning to jump rope got me in shape faster than any of the other exercises. Jumping rope is an incredible full-body cardio workout. It even tones the arms.",
    likes: 5,
    discussions: [
      {
        id: "fdsasf23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsfaf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsdff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "39042kjsf",
    title: "Surviving in Nature",
    author: { username: "user2" },
    community: { title: "Nature", id: "fdg342" },
    thumbnail: "https://i.ytimg.com/vi/Z7baTi2w_0Q/maxresdefault.jpg",
    domain: "www.youtube.com",
    type: "link",
    link: "https://www.youtube.com/watch?v=Z7baTi2w_0Q",
    body: "This is a cool video on how to survive in the wilderness.",
    likes: 12,
    discussions: [
      {
        id: "dfdsasf23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "afdsfaf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "sfdsdff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "dfsdb342",
    title: "Teaching Tutorial",
    author: { username: "user3" },
    community: { title: "Learning", id: "xxzxxz2" },
    thumbnail: "https://i.ytimg.com/vi/WwTpfVQgkU0/hqdefault.jpg",
    domain: "www.youtube.com",
    type: "link",
    link: "https://www.youtube.com/watch?v=WwTpfVQgkU0",
    body: "A TED talk on what all great teachers do! Teaching is hard for a lot of talented people and this video showcases what to do. Personally, I learned a lot just watching for a few minutes. Great video in my opinion.",
    likes: 44,
    discussions: [
      {
        id: "fdsasfx23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsfaxf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdxsdff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "434g32",
    title: "Cooking w Spices",
    author: { username: "user4" },
    community: { title: "Cooking", id: "mfkldmkmlk23" },
    thumbnail: "https://i.ytimg.com/vi/bsYzWK3cxOM/maxresdefault.jpg",
    domain: "www.youtube.com",
    type: "link",
    link: "https://www.youtube.com/watch?v=bsYzWK3cxOM",
    body: "An interesting video on cooking with spices for beginners.",
    likes: 16,
    discussions: [
      {
        id: "fdsasfe23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsfafe23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsdfef23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "jifjieojio33",
    title: "All About Fire",
    author: { username: "user1" },
    community: { title: "Nature", id: "fdg342" },
    type: "text",
    body: "The most important thing in nature is fire. Fire is what will keep you warm. Fire keeps away animals at night. Fire can be the start of shelter. Learning everything about fire is key! Let's learn more through this five step guide I wrote.",
    likes: 3,
    discussions: [
      {
        id: "fdsasxf23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "zfdsfaf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "xfdsdff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "34234fff",
    title: "Drawing Stick Figures",
    author: { username: "user5" },
    community: { title: "Art", id: "vdvdv33" },
    thumbnail:
      "https://i.ytimg.com/vi/dBqZt_Q5aDQ/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYYiBiKGIwDw==&rs=AOn4CLDhv2VrRehkmMKIJKzEpCAVzZHZCw",
    domain: "www.youtube.com",
    type: "link",
    link: "https://www.youtube.com/shorts/dBqZt_Q5aDQ",
    body: "Funny tutorial on drawing better stick figures. I liked this one. All of us draw stick figures growing up even if we never get to a more advanced level so this is a small helpful tip I'd say.",
    likes: 3,
    discussions: [
      {
        id: "afdsasf23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "yfdsfaf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "wtfdsdff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
  {
    id: "2323ff52",
    title: "Exercise & Mental Health",
    author: { username: "user6" },
    community: { title: "Fitness", id: "sdgsdgf34" },
    thumbnail:
      "https://www.helpguide.org/wp-content/uploads/2023/02/Mental-Health-Benefits-of-Exercise.jpeg",
    domain: "www.helpguide.org",
    type: "link",
    link: "https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm",
    body: "Important article on the mental health benefits of fitness.",
    likes: 33,
    discussions: [
      {
        id: "fdsasfg23",
        title: "Discussion",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdswfaf23",
        title: "Questions",
        author: { username: "user1" },
        comments: [],
      },
      {
        id: "fdsdtff23",
        title: "More Resources",
        author: { username: "user1" },
        comments: [],
      },
    ],
  },
];
