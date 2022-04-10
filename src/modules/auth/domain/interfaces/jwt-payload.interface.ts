export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}
