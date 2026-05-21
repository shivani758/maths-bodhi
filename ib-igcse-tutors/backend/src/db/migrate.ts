import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { query } from "./postgres.js";

async function firstExistingPath(paths: string[]) {
  for (const candidate of paths) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Keep looking; production builds may run from a different working directory.
    }
  }

  throw new Error(`Unable to locate schema.sql. Checked: ${paths.join(", ")}`);
}

export async function applyPostgresSchema() {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const schemaPath = await firstExistingPath([
    path.resolve(process.cwd(), "src/db/schema.sql"),
    path.resolve(process.cwd(), "db/schema.sql"),
    path.resolve(currentDir, "schema.sql"),
    path.resolve(currentDir, "../../src/db/schema.sql"),
  ]);
  const schemaSql = await readFile(schemaPath, "utf8");

  await query(schemaSql);
}
