import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export const dataDir = (): string => process.env.JOURNAL_DATA_DIR ?? "/tmp";

export const getDb = () => {
  try {
    const { env } = getCloudflareContext<{ DB: D1Database }>();
    if (env?.DB) {
      return drizzle(env.DB, { schema });
    }
  } catch {
    // Build time or static generation fallback
  }
  return drizzle({} as any, { schema });
};

/**
 * Proxy that routes all query builder calls to the active Cloudflare D1 instance.
 */
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const instance = getDb();
    const val = (instance as any)[prop];
    return typeof val === "function" ? val.bind(instance) : val;
  },
});

export * from "./schema";
