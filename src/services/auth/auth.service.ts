import { ApiError, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./auth.types";



export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result as ApiError;
  }

  return result as RegisterResponse;
}

export async function login(
  data: LoginRequest,
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result as ApiError;
  }

  return result as LoginResponse;
}