export interface RegisterRequestBody {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface AuthResponse {
  access_token: string;
}