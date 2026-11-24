// @ts-check
import nextjs from "@prisma/composer/nextjs";
import { secretString } from "@prisma/composer/arktype";
import { compute } from "@prisma/composer-prisma-cloud";
import { dataContract, postgres } from "@prisma/composer-prisma-cloud/orm";
import { type } from "arktype";
import contractJson from "./src/prisma/contract.json" with { type: "json" };

export default compute({
  name: "web",
  deps: {
    db: postgres(
      dataContract(
        /** @type {import("./src/prisma/contract.js").Contract} */
        (/** @type {unknown} */ (contractJson)),
      ),
    ),
  },
  input: type({ sessionSecret: secretString() }),
  build: nextjs({ module: import.meta.url, appDir: "." }),
});
