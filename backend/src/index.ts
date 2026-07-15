import { Hono } from 'hono'
import type { PrismaClient } from "./generated/prisma/client.js"; 
import withPrisma from "./lib/prisma.js";
import AuthRouter from './routes/auth.routes'
import BlogRouter from './routes/blog.routes'
import { Auth } from './middleware/auth.middleware.js';
import { cors } from 'hono/cors';


type ContextWithPrisma = {
  Variables: { 
    prisma: PrismaClient; 
  }
}; 

const app = new Hono<{
  Variables: { 
    prisma: PrismaClient; 
  },
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>(); 

app.use("*", cors())
app.use("*", withPrisma);        //ye global middleware ki tarah kaam karega

app.use('/api/v1/blog/*', Auth)
app.use('/api/v1/auth/me', Auth)



app.route('/api/v1/auth' , AuthRouter)
app.route('/api/v1/blog', BlogRouter)

app.get('/api/v1/search', async (c)=>{
  try{
     const prisma = c.get("prisma");
     const query = c.req.query("q")


      if (!query) {
       return c.json({
         success: false,
         message: "Search query is required",
        }, 400);
       }

   const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
         },
       },
      select: {
        id: true,
        name: true,
        email: true,
      },
      take: 10,
    });

  return c.json({
    success: true,
    users,
  });

     
  }catch(err){
    console.error("Search API Error:", err);
    c.status(403)
    return c.json({
      message:"something went wrong"
    })
  }
})



export default app
