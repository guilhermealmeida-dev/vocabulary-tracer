import "server-only";

import service from "../../service.mjs";

export function getDb() {
  return service.load().db.client;
}
