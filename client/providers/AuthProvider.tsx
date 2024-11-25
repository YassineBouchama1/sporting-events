"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

interface GuestType {
  id: string;
  role: string;
  username: string;
  avatar:string
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: any | null;
  guest: GuestType | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  setGuest: (guest: GuestType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE || "";
const USER_COOKIE = process.env.NEXT_PUBLIC_USER_COOKIE || "";
const GUEST_COOKIE = "guest_user"; // Define a cookie name for the guest user

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [guest, setGuest] = useState<GuestType | null>(null);

  useEffect(() => {
    // When app loads, check for encrypted token, user, and guest in cookies
    const encryptedToken = Cookies.get(AUTH_TOKEN_COOKIE);
    const encryptedUser = Cookies.get(USER_COOKIE);
    const encryptedGuest = Cookies.get(GUEST_COOKIE);

    if (encryptedToken && encryptedUser) {
      try {
        // Decrypt the token and user from the cookies
        const bytesToken = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
        const decryptedToken = bytesToken.toString(CryptoJS.enc.Utf8);
        const bytesUser = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
        const decryptedUser = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));

        if (decryptedToken && decryptedUser) {
          setToken(decryptedToken);
          setUser(decryptedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to decrypt token or user:", error);
      }
    }

    if (encryptedGuest) {
      try {
        // Decrypt the guest from the cookie
        const bytesGuest = CryptoJS.AES.decrypt(encryptedGuest, ENCRYPTION_KEY);
        const decryptedGuest = JSON.parse(
          bytesGuest.toString(CryptoJS.enc.Utf8)
        );
        setGuest(decryptedGuest);
      } catch (error) {
        console.error("Failed to decrypt guest:", error);
      }
    }
  }, []);

  // Function to log in by saving encrypted token and user in cookies
  const login = (token: string, user: any) => {
    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      ENCRYPTION_KEY
    ).toString();
    const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(user),
      ENCRYPTION_KEY
    ).toString();

    Cookies.set(AUTH_TOKEN_COOKIE, encryptedToken, { expires: 7 }); // Cookie expires in 7 days
    Cookies.set(USER_COOKIE, encryptedUser, { expires: 7 });
   Cookies.remove(GUEST_COOKIE); // if user create account remove his old account
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };



  
  // Function to log out by removing the token and user cookies
  const logout = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE);
    Cookies.remove(USER_COOKIE);
    Cookies.remove(GUEST_COOKIE);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setGuest(null); // Clear guest information on logout
  };

  // Function to set a guest user
  const setGuestUser = (guest: GuestType) => {
    const encryptedGuest = CryptoJS.AES.encrypt(
      JSON.stringify(guest),
      ENCRYPTION_KEY
    ).toString();
    Cookies.set(GUEST_COOKIE, encryptedGuest, { expires: 7 }); // Save guest in cookie

    setGuest(guest);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        guest,
        login,
        logout,
        setGuest: setGuestUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
