import "server-only";

import { SignJWT, jwtVerify } from "jose";
import service from "../../../../service.mjs";

const SESSION_DURATION = "7d";

function getSecretKey() {
  const secret = service.input().sessionSecret.expose();

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must have at least 32 characters");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());

    if (!payload.sub) {
      return null;
    }

    return {
      userId: payload.sub,
    };
  } catch {
    return null;
  }
}
