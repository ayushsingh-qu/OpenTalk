import { Hono } from 'hono'
import { blogs , blog , updateBlog , deleteBlog , postBlog } from '../controllers/blog.controllers'
import { Auth } from '../middleware/auth.middleware'

const BlogRouter = new Hono()

BlogRouter.get('/blogs' ,Auth, blogs)
BlogRouter.post('/post',Auth,postBlog)
BlogRouter.put('/update:id',Auth,updateBlog)
BlogRouter.delete('/delete:id',Auth,deleteBlog)
BlogRouter.get('/blog:id',Auth,blog)


 

export default BlogRouter