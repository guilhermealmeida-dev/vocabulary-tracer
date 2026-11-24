// @ts-check
import { appRoot } from "@prisma/composer";
import { variable } from "@prisma/composer-prisma-cloud";
import { dataContract, postgres } from "@prisma/composer-prisma-cloud/orm";
import vocabularyTrackerContractJson from "./src/prisma/contract.json" with { type: "json" };
import vocabularyTrackerService from "./service.mjs";

export default appRoot("vocabulary-tracker", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: dataContract(vocabularyTrackerContractJson),
      config: "./prisma.config.ts",
    }),
  );

  const sessionSecret = provision(
    variable.secret({ name: "SESSION_SECRET" }),
  ); // Signs session cookies.

  provision(vocabularyTrackerService, {
    deps: { db: database },
    input: { sessionSecret },
  });
});
