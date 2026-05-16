import { Context } from "hono";


//post the blog
const postBlog = async (c:Context)=>{
   try{
     const prisma = c.get("prisma");
     const body = await c.req.json();

     type bodyData = {
      title:string,
      content:string,
      autherId:string
     }
     
     const data:bodyData = {
      title:body.title,
      content:body.content,
      autherId:"null"
     }
     const blog = await prisma.Blog.create({data})

     return c.json({
      message:"post is now published",
      data:blog
     })
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not uploaded"
    })
  }
}

//update the blog
const updateBlog = async (c:Context)=>{
   try{
     const prisma = c.get("prisma");
     const body = await c.req.json();

     type bodyData = {
      title:string,
      content:string,

     }
     
     const data:bodyData = {
      title:body.title,
      content:body.content,
     }
     const blog = await prisma.Blog.update({
      where:{
        id:1
      },
      data
      })

     return c.json({
      message:"post is now updated",
      data:blog
     })
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not updated"
    })
  }
}

//delet the blog
const deleteBlog = async (c:Context)=>{
    try{
     const prisma = c.get("prisma");
     const body = await c.req.json();

     const blog = await prisma.Blog.delete({
      where:{
        id:body.id
      }
     })

     return c.json({
      message:"post is now deleted",
      data:blog
     })
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not deleted"
    })
  }
}

//get all blog
const blogs = async (c:Context)=>{
  try{
     const prisma = c.get("prisma");
     const body = await c.req.json();

  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not uploaded"
    })
  }

}


//get a blog by id
const blog = async (c:Context)=>{
   try{
     const prisma = c.get("prisma");
     const body = await c.req.json();
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not uploaded"
    })
  }
}

export {blogs,postBlog,updateBlog,deleteBlog,blog}