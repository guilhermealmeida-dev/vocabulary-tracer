import { GetSessionUseCase } from "@/features/auth/session/get-session.use-case";
import { UserRepository } from "@/features/repositories/user.repository";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    const userRepository = new UserRepository();
    const getSessionUseCase = new GetSessionUseCase(userRepository);

    const user = await getSessionUseCase.execute(token);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Session retrieved successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Get session error:", error);

    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
