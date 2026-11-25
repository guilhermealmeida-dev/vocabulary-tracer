import "dotenv/config";

import { definePrismaConfig } from "prisma/config";
import {
  defineConfig as ormConfig,
  prisma7Schema,
} from "@prisma/orm-postgres/config";

import { defineConfig as composer } from "@prisma/composer/config";
import { nextjsBuild } from "@prisma/composer/nextjs/control";
import { nodeBuild } from "@prisma/composer/node/control";
import {
  prismaCloud,
  prismaState,
} from "@prisma/composer-prisma-cloud/control";

export default definePrismaConfig({
  orm: ormConfig({
    contract: prisma7Schema("src/prisma/schema.prisma"),
    output: "src/prisma",
    db: {
      connection: process.env["DATABASE_URL"]!,
    },
  }),

  composer: composer({
    entry: "./module.ts",
    extensions: [
      prismaCloud({ region: "us-east-1" }),
      nodeBuild(),
      nextjsBuild(),
    ],
    state: prismaState(),
  }),
});
