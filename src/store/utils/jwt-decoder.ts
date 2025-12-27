import { jwtDecode } from "jwt-decode";

type DecodedJwt = {
  email: string;
  exp: number;
  iat: number;
  userId: number;
  username: string;
};

export function decodeJWT(token: string): DecodedJwt {
  const decodedData = jwtDecode<DecodedJwt>(token);

  return decodedData;
}
