import "server-only";

import { getDb } from "@/lib/prisma";

export class UserRepository {
  async findByEmail(email: string) {
    const db = getDb();

    return db.orm.public.User.where((user) => user.email.eq(email)).first();
  }

  async findById(id: string) {
    const db = getDb();

    return db.orm.public.User
      .select("id", "name", "email", "createdAt")
      .first({ id });
  }

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    const db = getDb();

    return db.orm.public.User
      .select("id", "name", "email", "createdAt")
      .create(data);
  }
}
