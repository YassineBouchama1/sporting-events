import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default_key';
const AUTH_TOKEN_COOKIE = process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE || 'authToken';
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';



// this function bring token from coockies
const getDecryptedToken = (): string | null => {
    const encryptedToken = Cookies.get(AUTH_TOKEN_COOKIE);
    if (!encryptedToken) return null;

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Failed to decrypt token:', error);
        return null;
    }
};


// base query
export const baseQuery =  function(){
     
}