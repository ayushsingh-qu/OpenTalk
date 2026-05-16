import { Context , Next } from "hono";
import { verify } from "hono/jwt";

const Auth = (c:Context , next:Next)=>{
const header = c.req.header("Authorization") || ""
//barrare token
const token = header.split(" ")[1]
//get the header
//verify jwt and header
//if header is correct we can proceed
//if header is wrong return 403 error code 
//get the user id and pass it for next route

  
 return next();


  
}

export {Auth}