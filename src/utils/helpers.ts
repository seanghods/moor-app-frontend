export const BASE_URL = "http://10.0.1.18:3001/api";
// import.meta.env.MODE === "production"
//   ? "https://api.liftrightai.com/api"
//   : "/api";

export const API_ROUTES = {
  base: `${BASE_URL}`,
  community: `${BASE_URL}/community`,
  followCommunity: `${BASE_URL}/community/follow`,
  allCommunity: `${BASE_URL}/community/all`,
  post: `${BASE_URL}/post`,
  postVote: `${BASE_URL}/post/vote`,
  commentVote: `${BASE_URL}/comment/vote`,
  discussion: `${BASE_URL}/discussion`,
  comment: `${BASE_URL}/comment`,
  search: `${BASE_URL}/search`,
  trending: `${BASE_URL}/trending`,
  user: `${BASE_URL}/user`,
  changeUsername: `${BASE_URL}/user/change-username`,
  changeBio: `${BASE_URL}/user/change-bio`,
  register: `${BASE_URL}/register`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  checkSession: `${BASE_URL}/check-session`,
  verifyEmail: `${BASE_URL}/verify-email`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
};
