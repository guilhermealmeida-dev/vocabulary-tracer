import { UserRepository } from "@/features/repositories/user.repository";
import bcrypt from "bcryptjs";
import { LoginInput } from "./login.schema";

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const passwordMatches = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}