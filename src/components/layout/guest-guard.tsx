
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GetSessionUseCase } from "@/features/auth/session/get-session.use-case";
import { UserRepository } from "@/features/repositories/user.repository";

interface GuestGuardProps {
  children: React.ReactNode;
}

export async function GuestGuard({ children }: GuestGuardProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const userRepository = new UserRepository();
  const getSessionUseCase = new GetSessionUseCase(userRepository);

  const user = await getSessionUseCase.execute(token);

  if (user) {
    redirect("/home");
  }

  return children;
}
