import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import { UserRepository } from "@/features/auth/repositories/user.repository";
import { LoginUserService } from "@/features/auth/services/login-user.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = loginSchema.parse(body);

    const userRepository = new UserRepository();

    const loginUserService = new LoginUserService(userRepository);

    const user = await loginUserService.execute(input);

    return NextResponse.json(
      {
        message: "Login successful.",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed.",
          errors: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}