import { Hono } from 'hono'
import { blogs , blog , updateBlog , deleteBlog , postBlog ,myblog} from '../controllers/blog.controllers'

const BlogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()



BlogRouter.get('/blogs' , blogs)
BlogRouter.get('/me',myblog)
BlogRouter.post('/post',postBlog)
BlogRouter.put('/:id',updateBlog)
BlogRouter.delete('/:id',deleteBlog)
BlogRouter.get('/:id',blog)


 

export default BlogRouter