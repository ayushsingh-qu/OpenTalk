import { Hono } from 'hono'
import { blogs, blog, updateBlog, deleteBlog, postBlog, myblog, uploadBlogImage } from '../controllers/blog.controllers'

const BlogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
    CLOUDINARY_UPLOAD_PRESET?: string;
  }
}>()

BlogRouter.post('/upload', uploadBlogImage)
BlogRouter.get('/blogs' , blogs)
BlogRouter.get('/me',myblog)
BlogRouter.post('/post',postBlog)
BlogRouter.put('/:id',updateBlog)
BlogRouter.delete('/:id',deleteBlog)
BlogRouter.get('/:id',blog)


 

export default BlogRouter