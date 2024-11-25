"use server";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";




// function to decrypt cookies  and bring authed user in server side 
const getCookiesServer = async () => {

  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
  const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE || "";
  const USER_COOKIE = process.env.NEXT_PUBLIC_USER_COOKIE || "";
  const GUEST_COOKIE = "guest_user";

  // Await the cookies promise to get the actual cookies object
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  const encryptedUser = cookieStore.get(USER_COOKIE)?.value;
  const encryptedGuest = cookieStore.get(GUEST_COOKIE)?.value;

  let user = null;
  let guest = null;

  if (encryptedToken && encryptedUser) {
    try {
      const bytesToken = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
      const decryptedToken = bytesToken.toString(CryptoJS.enc.Utf8);
      const bytesUser = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
      user = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));

      if (!decryptedToken || !user) {
        user = null;
      }
    } catch (error) {
      console.error("Failed to decrypt token or user:", error);
    }
  }

  if (encryptedGuest) {
    try {
      const bytesGuest = CryptoJS.AES.decrypt(encryptedGuest, ENCRYPTION_KEY);
      guest = JSON.parse(bytesGuest.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Failed to decrypt guest:", error);
    }
  }

  return { user, guest };
};


export default getCookiesServer;