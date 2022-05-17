const path = require("path");
import { Knex } from "knex";

const sqliteOptions = require("knex")({
  client: "better-sqlite3",
  connection: {
    filename: "db/chat.sqlite",
  },
  useNullAsDefault: true,
});

sqliteOptions.schema.hasTable("chat").then((exists: boolean) => {
  if (!exists) {
    sqliteOptions.schema
      .createTable("chat", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.string("email");
        table.string("message");
        table.string("time");
      })
      .then(() => {
        console.log("Table created");
      })
      .catch((error: string) => {
        console.error(error);
        throw error;
      })

      .finally(() => {
        sqliteOptions.destroy();
      });
  }
});

module.exports = sqliteOptions;
