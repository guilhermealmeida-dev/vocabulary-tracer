
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}
