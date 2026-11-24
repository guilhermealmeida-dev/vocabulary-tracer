
import { loginSchema } from "@/features/auth/login/login.schema";
import { LoginUserUseCase } from "@/features/auth/login/login.use-case";
import { UserRepository } from "@/features/repositories/user.repository";
import { createSessionToken } from "@/features/auth/session/session-token";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const SESSION_COOKIE_NAME = "session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = loginSchema.parse(body);

    const userRepository = new UserRepository();
    const loginUserUseCase = new LoginUserUseCase(userRepository);

    const user = await loginUserUseCase.execute(input);

    const token = await createSessionToken(user.id);

    const response = NextResponse.json(
      {
        message: "Login successful.",
        data: user,
      },
      { status: 200 },
    );

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
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
