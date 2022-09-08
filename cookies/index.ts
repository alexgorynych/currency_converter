export { keys as cookieKeys } from "./keys";

export const setCookie = (key: string, value: string) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5, date.getMonth(), date.getDate());
    document.cookie = `${key}=${value}; path=/; expires=${date.toUTCString()}`;
};
