import "server-only";

import bcrypt from "bcryptjs";

import type { LoginInput } from "../schemas/login.schema";
import { UserRepository } from "../repositories/user.repository";

export class LoginUserService {
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