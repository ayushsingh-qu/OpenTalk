import { Hono } from 'hono'
import type { PrismaClient } from "./generated/prisma/client.js"; 
import withPrisma from "./lib/prisma.js";
import AuthRouter from './routes/auth.routes'
import BlogRouter from './routes/blog.routes'
import { Auth } from './middleware/auth.middleware.js';

type ContextWithPrisma = {
  Variables: { 
    prisma: PrismaClient; 
  }; 
}; 

const app = new Hono<ContextWithPrisma>(); 

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
 
app.use("*", withPrisma);    //ye global middleware ki tarah kaam karega
app.use('/api/v1/blog*',Auth)

app.route('/api/v1/auth' , AuthRouter)
app.route('/api/v1/blog', BlogRouter)

app.get("/users", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany({
    include: { blogs: true },
  });
  return c.json({ users });
});

export default app
