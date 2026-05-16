import type { Context, Next } from "hono";
import { PrismaClient } from "../generated/prisma/client.js";
import { withAccelerate } from '@prisma/extension-accelerate'

// In Cloudflare Workers, env vars come from c.env (Wrangler bindings),
// not process.env. We create the client per-request using the injected env.
function withPrisma(c: Context, next: Next) {
  
  if (!c.get("prisma")) {
    const databaseUrl = (c.env as { DATABASE_URL: string }).DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL binding is not set in Wrangler config");
    }
    const prisma = new PrismaClient({
      accelerateUrl: databaseUrl,
    }).$extends(withAccelerate()) as unknown as PrismaClient;
    c.set("prisma", prisma);
  }
  return next();
}

export default withPrisma;
