import { Context , Next } from "hono";
import { verify , decode } from "hono/jwt";

const Auth = async (c:Context , next:Next)=>{
  try{
    
const header = c.req.header("Authorization") || ""
//barrare token
const token = header.split(" ")[1]

if(!token){
  return c.json({
    message:"sorry you are not authorized",
    auth:false
  },401)
}

const data = await verify(token, c.env.JWT_SECRET, "HS256")
 
 if(data){
  c.set("userid", data.sub || data.id)
  await next();
 }else{
   c.status(403);
   return c.json({
    message:"you are not logged in",
    auth:false
  });
 }
   }catch(err){
    console.error("Auth Middleware Error:", err);
    c.status(403);
    return c.json({
      message: "invalid or expired token",
      auth: false
    });
   }

  
}

export {Auth}