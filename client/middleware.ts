import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";


// Retrieves cookies from the request and decrypts them.
export const getDecryptedCookies = (req: NextRequest) => {
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
  const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE || "";
  const USER_COOKIE = process.env.NEXT_PUBLIC_USER_COOKIE || "";

  // Use the get method to access cookies
  const encryptedToken = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
  const encryptedUser = req.cookies.get(USER_COOKIE)?.value;

  if (!encryptedToken || !encryptedUser) {
    console.log("null cookies");
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


// Checks if a route requires authentication based on its type.
export const isAuthRoute = (path: string, routes: string[]) =>
  routes.some((route) => path.startsWith(route));

export default async function middleware(req: NextRequest) {
  const authRoutes = ["/"];
  const authRoutesAdmin = ["/admin", "/admin/*"];
  const authRoutesUser = ["/"];

  const redirectUrl = new URL("/", req.nextUrl.origin);

  // Get decrypted cookies
  const { token, user } = getDecryptedCookies(req);


  const isAuth = isAuthRoute(req.nextUrl.pathname, authRoutes);
  const isAdmin = isAuthRoute(req.nextUrl.pathname, authRoutesAdmin);
  const isUser = isAuthRoute(req.nextUrl.pathname, authRoutesUser);

  // Redirect unauthenticated users trying to access authenticated routes
  if (!token && isAuth) {
    return NextResponse.redirect(redirectUrl);
  }

  if (token) {
    // Redirect admins trying to access user-specific routes
    if (user.role === "admin" && isUser) {
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect users trying to access admin-specific routes
    if (user.role === "user" && isAdmin) {
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};