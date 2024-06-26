export const BASE_URL = __DEV__
  ? 'http://10.0.1.18:3001/api'
  : 'https://moor-app-174f83203b5c.herokuapp.com/api';

export const API_ROUTES = {
  base: `${BASE_URL}`,
  community: `${BASE_URL}/community`,
  followCommunity: `${BASE_URL}/community/follow`,
  allCommunity: `${BASE_URL}/community/all`,
  addModerator: `${BASE_URL}/community/add-moderator`,
  removeModerator: `${BASE_URL}/community/remove-moderator`,
  post: `${BASE_URL}/post`,
  postVote: `${BASE_URL}/post/vote`,
  friendsPosts: `${BASE_URL}/post/friends`,
  commentVote: `${BASE_URL}/comment/vote`,
  discussion: `${BASE_URL}/discussion`,
  comment: `${BASE_URL}/comment`,
  search: `${BASE_URL}/search`,
  trending: `${BASE_URL}/trending`,
  user: `${BASE_URL}/user`,
  followUser: `${BASE_URL}/user/follow`,
  changeUsername: `${BASE_URL}/user/change-username`,
  changePassword: `${BASE_URL}/user/change-password`,
  changeBio: `${BASE_URL}/user/change-bio`,
  changeProfilePic: `${BASE_URL}/user/change-profile-image`,
  changeCoverPic: `${BASE_URL}/user/change-cover-image`,
  register: `${BASE_URL}/register`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  checkSession: `${BASE_URL}/check-session`,
  verifyEmail: `${BASE_URL}/verify-email`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
};
