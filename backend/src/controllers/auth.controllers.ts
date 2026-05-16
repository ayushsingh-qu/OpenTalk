import { Context } from 'hono'
import { Jwt } from 'hono/utils/jwt';
import { sign } from 'hono/jwt';
import { validator } from 'hono/validator';


const registerUser = async (c: Context) => {
  try{
   const prisma = c.get("prisma");
   const body = await c.req.json();
    
   type dataType={
    name:string,
    email:String,
    password:string
   }
  
  const data:dataType={
    name:body.name,
    email:body.email,
    password:body.password
  }

  const user = await prisma.user.create({
    data:data
  });
  const resData = {
    name:user.name,
    email:user.email
  }

  const token = await sign({id:user.id },"my secret")
 
  return c.json({
    message: "User Registered",
    data:resData,
    jwt:token
  });

  }catch(err){
    c.status(411)
    return c.json({
      Error:err,
      message:"something went wrong"
    })
  }
  
};


const loginUser = async (c: Context) => {
   try{
   const prisma = c.get("prisma");
   const body = await c.req.json();
    
   type dataType={
    email:String,
    password:string
   }
  
  const data:dataType={
    email:body.email,
    password:body.password
  }

  const user = await prisma.user.findUnique({
    where:{
      email : data.email,
    }
  });

  if(!(user.password==data.password)){
    throw new Error("wrong password or email")
    
  }

  const resData = {
    name:user.name,
    email:user.email
  }

  const token = await sign({id:user.id },"my secret")
 
  return c.json({
    message: "User signedin successfully",
    data:resData,
    jwt:token
  });

  }catch(err){
    console.log(err)
    c.status(411)
    return c.json({
      Error:err,
      message:"something went wrong"
    })
  }
}


const logoutUser = async (c: Context) => {
  return c.json({
    success: true,
    message: 'User Logout'
  })
}

export {registerUser , loginUser ,  logoutUser}