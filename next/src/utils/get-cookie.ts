export const getCookie = (name: string): string | null => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';').map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, ...cookieParts] = cookie.split('=');
    if (cookieName === name) {
      const cookieValue = cookieParts.join('=');
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};
