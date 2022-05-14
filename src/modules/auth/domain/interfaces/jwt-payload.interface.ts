export interface JwtPayload {
  sub?: string;
  iat?: number;
  exp?: number;
  id: string;
  role: string;
  profileId: string;
}
