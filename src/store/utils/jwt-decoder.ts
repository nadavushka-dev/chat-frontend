type DecodedJwt = {
  email: string;
  exp: number;
  iat: number;
  userId: number;
  username: string;
};

export function decodeJWT(token: string): DecodedJwt {
  const data = token.split(".")[1];

  const decodedData = JSON.parse(window.atob(data));

  return decodedData;
}
