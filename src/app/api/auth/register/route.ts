import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";

import { registerSchema } from "@/features/auth/schemas/register.schema";
import { UserRepository } from "@/features/auth/repositories/user.repository";
import { RegisterUserService } from "@/features/auth/services/register-user.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = registerSchema.parse(body);

    const userRepository = new UserRepository();

    const registerUserService = new RegisterUserService(userRepository);

    const user = await registerUserService.execute(input);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        data: user,
      },
      { status: 201 },
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

    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 },
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 },
      );
    }

    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
