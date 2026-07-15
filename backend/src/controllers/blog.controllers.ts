import { Context } from "hono";




//post the blog
const postBlog = async (c:Context)=>{
   try{
     const prisma = c.get("prisma"); 
     const body = await c.req.json();
     const authorId = c.get("userid")
     
     type bodyData = {
      title:string,
      content:string,
      authorId:string
     }
     
     const data:bodyData = {
      title:body.title,
      content:body.content,
      authorId:authorId
     }
     const blog = await prisma.blog.create({data})

     return c.json({
      message:"post is now published",
      data:blog
     },200)
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not uploaded",
      error:err
    })
  }
}

//update the blog
const updateBlog = async (c:Context)=>{
   try{
     const prisma = c.get("prisma");
     const body = await c.req.json();
     const id = c.req.param("id")
    



     type bodyData = {
      title:string,
      content:string,
     }
     
     const data:bodyData = {
      title:body.title,
      content:body.content,
    
     }

     const blog = await prisma.blog.update({
      where:{
        id:id
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
     const id = c.req.param("id")

     const blog = await prisma.blog.delete({
      where:{
        id:id
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

//get my blog
const myblog = async (c:Context)=>{
 const prisma = c.get("prisma"); 
 const authorId = c.get("userid")
 try{
  const user = await prisma.user.findUnique({
    select:{
      name:true,
      email:true,
      createdAt:true,
      blogs:{
        select:{
         title:true,
         content:true,
         id:true
        }
      }
    },
    where:{
      id:authorId
    }
  })

  user.blogs = user.blogs.reverse();

   return c.json({
    message: "User is Authenticated",
    data:user,
  },200);

 }catch(error){
  return c.json({
      message:"user is not authenticated",
      error:error
    },401)
 }
}


//get all blog
const blogs = async (c:Context)=>{
  try{
     const prisma = c.get("prisma");
     const blog = await prisma.blog.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        },
         _count: {
            select: {
              likes: true,
           }
         }
      },
     })

     if(blog){  
      return c.json({
      blog
     })
     }else{
      return c.json({
      message:"blog is not exist"
     })
     }
   

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
     const id = c.req.param("id")

     console.log(id)

     const blog = await  prisma.blog.findUnique({
       select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        },
         _count: {
            select: {
              likes: true,
           }
         },
      },

      where:{
        id:id
      }
     })

     return c.json({
      blog:blog
     })
     
  }catch(err){
    c.status(403)
    return c.json({
      message:"post is not uploaded"
    })
  }
}

export {blogs,postBlog,updateBlog,deleteBlog,blog,myblog}