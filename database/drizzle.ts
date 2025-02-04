import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// @ts-ignore
const sql = neon(config.env.databaseUrl);

export const db = drizzle({ client: sql });
