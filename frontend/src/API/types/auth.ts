export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody {
  username: string;
  fistname: string;
  lastname: string;
  email: string;
  image: string;
  password: string;
}


export interface AuthResponse {
  access_token: string;
}