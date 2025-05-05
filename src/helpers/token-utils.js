export const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;
  
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return true;
  
    try {
      const payload = JSON.parse(atob(payloadBase64));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      return true; 
    }
  };
  