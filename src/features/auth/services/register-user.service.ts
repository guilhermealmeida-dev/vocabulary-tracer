import "server-only";

import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/user.repository";
import { RegisterInput } from "../schemas/register.schema";

export class RegisterUserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: RegisterInput) {
    const existingUser = await this.userRepository.findByEmail(
      input.email,
    );

    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return user;
  }
}