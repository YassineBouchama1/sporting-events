
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";

// types of c
type CookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};




// function to set a cookie with encryption
export const setEncryptedCookie = (
  name: string,
  value: unknown,
  options: CookieOptions = { expires: 7 }
): void => {
  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    ENCRYPTION_KEY
  ).toString();
  Cookies.set(name, encryptedValue, options);
};



// Function to get and decrypt a cookie
export const getDecryptedCookie = <T = unknown>(name: string): T | null => {
  const encryptedValue = Cookies.get(name);
  if (!encryptedValue) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
    const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
    return decryptedValue;
  } catch (error) {
    console.error(`Failed to decrypt cookie ${name}:`, error);
    return null;
  }
};

// Function to remove a cookie
export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};
