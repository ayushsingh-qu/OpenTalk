import { Context } from 'hono'
import { sign } from 'hono/jwt';




const registerUser = async (c: Context) => {
  try{
   const prisma = c.get("prisma");
   const body = await c.req.json();
   const secret = c.env.JWT_SECRET
   
    
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
    email:user.email,
    since:user.createdAt,
    blog:user.blogs,
    id:user.id
  }

  const payload = {
    sub: user.id ,
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // Token expires in 30 minutes
  }

  const token = await sign(payload, secret,"HS256")
 
  return c.json({
    message: "User Registered",
    data:resData,
    jwt:token
  });

  }catch(err){
    console.error("Register User Error:", err);
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
   const secret = c.env.JWT_SECRET
    console.log(body)
   type dataType = {
    email:String,
    password:String
   }
   
   
  const data:dataType={
    email:body.email,
    password:body.password
  }   
 
  console.log(data)

  const user = await prisma.user.findUnique({
    where:{
      email : data.email,
    }
  });

  console.log(user)
  
  if(!user){
    return c.json({
      message:"user does not exist"
    })
  }

  if(!(user.password===data.password)){
    throw new Error("wrong password or email")
    
  }

  const resData = {
    name:user.name,
    email:user.email,
    since:user.createdAt,
    blog:user.blogs
  }

   const payload = {
    sub: user.id ,
    exp: Math.floor(Date.now() / 1000) + 60 * 30, // Token expires in 30 minutes
  }
   

  const token = await sign(payload, secret,"HS256")
 
  return c.json({
    message: "User signedin successfully",
    data:resData,
    jwt:token
  },200);

  }catch(err){
    c.status(411)
    return c.json({
      Error:err,
      message:"something went wrong"
    })
  }
}


const logoutUser = async (c: Context) => {
 try{
   const header = c.req.header("Authorization")
   if (!header) {
     c.status(400)
     return c.json({
       message: "Authorization header missing"
     })
   }

   const token = "";
   

  return c.json({
    message: "User signedout successfully",
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

const updateUser = async (c: Context) => {
  try {
    const prisma = c.get("prisma");
    const body = await c.req.json();
    const userId = c.get("userid");

    const data: { name?: string; email?: string; password?: string } = {};
    if (body.name)     data.name     = body.name;
    if (body.email)    data.email    = body.email;
    if (body.password) data.password = body.password;

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        blogs: {
          select: { id: true, title: true, content: true },
        },
      },
    });

    return c.json({
      message: "User updated successfully",
      data: user,
    }, 200);

  } catch (err) {
    c.status(403);
    return c.json({
      message: "Failed to update user",
      error: err,
    });
  }
};

export { registerUser, loginUser, logoutUser, updateUser }