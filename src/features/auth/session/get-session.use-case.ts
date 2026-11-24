import { UserRepository } from "@/features/repositories/user.repository";
import { verifySessionToken } from "./session-token";

export class GetSessionUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string | undefined) {
    if (!token) {
      return null;
    }

    const session = await verifySessionToken(token);

    if (!session) {
      return null;
    }

    const user = await this.userRepository.findById(session.userId);

    if (!user) {
      return null;
    }

    return user;
  }
}