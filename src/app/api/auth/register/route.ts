import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { registerSchema } from "@/features/auth/register/register.schema";
import { UserRepository } from "@/features/repositories/user.repository";
import { RegisterUserUseCase } from "@/features/auth/register/register.use-case";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = registerSchema.parse(body);

    const userRepository = new UserRepository();

    const registerUserUseCase = new RegisterUserUseCase(userRepository);

    const user = await registerUserUseCase.execute(input);

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
