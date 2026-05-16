import { Hono } from 'hono'
import { registerUser,loginUser,logoutUser } from '../controllers/auth.controllers'

const AuthRouter = new Hono<{
 Bindings:{
  DATABASE_URL:string     //c.env ke datatype ko define karenge to typr error nahi aayega
 }
}>()

AuthRouter.post('/signup' , registerUser)
AuthRouter.post('/signin' , loginUser)
AuthRouter.post('/logout' , logoutUser)




export default AuthRouter