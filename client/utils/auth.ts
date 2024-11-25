import Cookies from "js-cookie";
import CryptoJS from "crypto-js";



//  Retrieves cookies from the request and decrypts them.

export const getDecryptedCookies = () => {
  

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE || "";
const USER_COOKIE = process.env.NEXT_PUBLIC_USER_COOKIE || "";



const encryptedToken = Cookies.get(AUTH_TOKEN_COOKIE);
const encryptedUser = Cookies.get(USER_COOKIE);

console.log(encryptedToken);
  if (!encryptedToken || !encryptedUser) {

    console.log('null coockies')
    return { token: null, user: null };
  }

  try {
    const bytesToken = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    const decryptedToken = bytesToken.toString(CryptoJS.enc.Utf8);

    const bytesUser = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
    const decryptedUser = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));

    return { token: decryptedToken, user: decryptedUser };
  } catch (error) {
    console.error("Error decrypting cookies:", error);
    return { token: null, user: null };
  }
};

//  Checks if a route requires authentication based on its type.
export const isAuthRoute = (path: string, routes: string[]) =>
  routes.some((route) => path.startsWith(route));
