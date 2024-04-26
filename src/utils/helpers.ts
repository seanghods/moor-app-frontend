export const BASE_URL = "http://10.0.1.18:3001/api";
// import.meta.env.MODE === "production"
//   ? "https://api.liftrightai.com/api"
//   : "/api";

export const API_ROUTES = {
  base: `${BASE_URL}`,
  community: `${BASE_URL}/community`,
  allCommunity: `${BASE_URL}/community/all`,
  post: `${BASE_URL}/post`,
  search: `${BASE_URL}/search`,
  trending: `${BASE_URL}/trending`,
  register: `${BASE_URL}/register`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  checkSession: `${BASE_URL}/check-session`,
  verifyEmail: `${BASE_URL}/verify-email`,
  createCheckoutSession: `${BASE_URL}/create-checkout-session`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
};